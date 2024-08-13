import { Strategy  } from 'passport-google-oauth20'
import passport  from 'passport'
import { config } from 'dotenv'
import { userModel } from '../../../models/users/user.models';


config();

const url: string = process.env.url as string;
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_ID as string
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET as string;
const Gpassport = passport;

Gpassport.serializeUser((user: any, done) => {
	done(null, user._id)
}
)

Gpassport.deserializeUser(async (id: string, done) => {
	try {
		let user = await userModel.findById(id)
		done(null, user)
	} catch (err) {
		done(err, null)
	}
})

Gpassport.use(new Strategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: `${url}/api/auth/verification/google`,
	scope: ['email', "profile"]
}, async (accessToken, refreshToken, profile: any, done) => {
	const email = profile.emails[0].value;
	let result = await userModel.findOne({ email: email })
	if (result) {
		done(null, result)
	} else {
		const newUser =  new userModel({
			email: profile.emails[0].value,
			f_name: profile.name.familyName,
			l_name: profile.name.givenName,
			googleId: profile.id
		})
		let savedUser = await newUser.save()
		done(null, newUser)
	}
}))

export default Gpassport
