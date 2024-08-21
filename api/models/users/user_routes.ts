import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from 'dotenv'
import { userModel } from "./user.models";
import { productModel } from "../products/product.models";
import { verifyAction } from "./user_controller";


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

userRoute.get("/bookmarks", (req, res) => {
	// console.log("verified")
	const {email} = req.query
	userModel.findOne({ email: email }, { bookmarks: 1 }).then((response) => {
		res.status(200).json(response)
	})
		.catch(err => {
		console.log(err.message)
	})
})

userRoute.post("/add-bookmark", async (req, res) => {
	const { email, productId } = req.body
	try {
		let productResult = await productModel.findById(productId)
		if (productResult) {
			userModel.findOneAndUpdate({ email: email }, {
				$push: {
					bookmarks: productResult._id
				}
			}, { new: true })
				.then((data) => {
					res.status(200).json(data)
				})
				.catch((err) => {
					console.log(err.message)
					res.status(500).json({ message: err.message })
				})
		}
		else {
			res.status(404).json({ message: "Product not found" })
		}
	}
	catch (err: any) {
		res.status(500).json({ message: err.message })
	}
})


userRoute.post("/remove-bookmark", verifyAction, async (req: Request, res: Response) => {
	const { email, productId } = req.body;
	try {
		let result = await userModel.updateOne({ email: email }, { $pull: { bookmarks: productId } }, { new: true })
		if (result) {
			res.status(200).json({ message: "Bookmark removed successfully" })
		}
		else {
			res.status(404).json({ message: "Bookmark not found" })
		}
	}
	catch (err: any) {
		res.status(500).json({ message: err.message })
	}
})
export default userRoute;
