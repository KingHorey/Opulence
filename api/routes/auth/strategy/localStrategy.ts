import { Strategy } from "passport-local";
import { userModel } from "../../../models/users/user.models";
import passport from "passport";
import { compare } from "bcrypt";

passport.serializeUser((user:any, done) => {
	done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
	try {
		let match = await userModel.findOne({ _id: id }, {isAdmin: 1});
		if (!match) {
			throw new Error("User not found");
		}
		done(null, match);
	} catch (err: any) {
		done(err, false);
	}
});

export default passport.use(new Strategy({ usernameField: "email",  }, async (email, password, done) => {
	try {
		let result = await userModel.findOne({ email: email })
		console.log(result)
		if (!result) {
			// done(null, false, { message: "Incorrect email address" });
			throw new Error("Incorrect email address");
		}
		else {
			compare(password, result.password)
				.then((res) => {
					if (res) {
						done(null, result);
					}
					else {
						// done(null, false, { message: "Incorrect password" });
						throw new Error("Incorrect password");
					}
				})
				.catch((err) => {
					done(err, false);
				})
		}
	} catch (err: any) {
		done(err, false);
	}
}));
