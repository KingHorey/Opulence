import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from 'dotenv'
import { userModel } from "./user.models";

config();

const userRoute: Router = Router();
const secretToken = process.env.JWT_TOKEN_SECRET as string;


userRoute.get("/personal-information", (req: Request, res: Response) => {

	const token: string | undefined = req.headers.authorization?.split(' ')[1]
	if (token) {
		const verifiedToken = jwt.verify(token, secretToken)
		if (verifiedToken) {
			let userId = req.query.userDetails

			userModel.findOne({ email: userId }, { f_name: 1, l_name: 1, email: 1 , emailVerified: 1,  telephoneHome: 1, telephonePersonal: 1})
				.then((data) => {
					res.status(200).json(data)
				})
				.catch((err) => {
					res.status(500).json({ message: err.message })
				})
		}
		else {
			res.status(401).json({ message: "Unauthorized" })
		}
	}
	else {
		res.status(401).json({ message: "Unauthorized" })
	}

})


userRoute.put("/update-personal-information", (req: Request, res: Response) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (token) {
		jwt.verify(token, secretToken, (err, decoded) => {
			if (err) {
				res.status(401).json({ message: "Unauthorized" })
			}
			else if (decoded) {
				const { telephoneHome, telephonePersonal, email, userMail } = req.body
				userModel.findOne({ email: userMail }).then((data) => {
					if (data) {
						if (data.email !== email) {
							console.log('Found diff data ', data)
							userModel.findOneAndUpdate({ email: req.body.userMail }, { telephoneHome, telephonePersonal, email }, {new: true, select: {telephoneHome: 1, telephonePersonal: 1, email: 1, f_name: 1, l_name: 1, emailVerified: 1, password: 0}})
								.then((data) => {
									if (data) {
										 jwt.sign(decoded, secretToken, (err, token) => {
											 if (err) {
												console.error(err.message)
												res.status(500).json({ message: err.message })
											}
											else {
												res.status(200).json({ message: "User updated successfully", user: data, token: token })
											}
										})
									}
									else {
										res.status(404).json({ message: "User not found" })
									}
								})
								.catch((err) => {
									console.error(err.message)
									res.status(500).json({ message: err.message })
								})
						}
						else {
							userModel.findOneAndUpdate({ email: req.body.userMail }, { telephoneHome, telephonePersonal }, {
								new: true, select: {
									telephoneHome: 1, telephonePersonal: 1, email: 1, emailVerified: 1, f_name: 1, l_name: 1
								}
							})
								.then((data) => {
									if (data) {
										res.status(200).json({ message: "User updated successfully", user:data })
									}
									else {
										res.status(404).json({ message: "User not found" })
									}
								})
								.catch((err) => {
									res.status(500).json({ message: err.message })
								})
						}
					}
					else {
						res.status(404).json({ message: "User not found" })
					}
				})
					.catch((err) => {
						res.status(500).json({ message: err.message })
					})
			}
			else {
				res.status(401).json({ message: "Unauthorized" })
			}
		})
	}
})

export default userRoute;
