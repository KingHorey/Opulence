import { Router, Request, Response, NextFunction } from 'express'
import { productModel } from '../models/products/product.models'
import { categoryModel } from '../models/categories/category.models'
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { userModel } from '../models/users/user.models';
import { brandModel } from '../models/brands/brand.models';
import slugify from 'slugify';

/**
 * Endpoints for all product related processes
 *
 */

export const productsRoute: Router = Router();
config();

const secretToken = process.env.JWT_TOKEN_SECRET as string;

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" })
	}
	try {
		let decodedResult = jwt.verify(token, secretToken)
		let userDetails = req.body.userDetails
		try {
			let getStatus = await userModel.findOne({ email: userDetails }, { isAdmin: 1 })
			if (decodedResult && getStatus?.isAdmin) next()
			else return res.status(401).json({ message: "Only Authorized personnels can perform this action" })
		} catch  {
			return res.status(500).json({ message: "An error occured" })
		}
	}
	catch (err: any) {
		return res.status(401).json({ message: err.message })
	}
}

productsRoute.get('/new-arrivals', async (req: Request, res: Response) => {
		const query: string[] = []
	if (req.query.category) {
		let data = req.query.category?.toString().split("=").toString().split("&")
		data.forEach((item) => {
			query.push(item.split(",")[1])
		})
	}
	try {
			const newQuery = query.length > 0 ? { category: {$in: query}} : {}
			let startPage: number = parseInt(req.query.page as string) || 0
			let limit: number = parseInt(req.query.limit as string) || 9
			let countDocuments = await productModel.find(newQuery).sort({ createdAt: -1 }).countDocuments()
		let result = await productModel.find(newQuery).populate('brand').populate('category').sort({ createdAt: -1 }).skip(startPage * limit).limit(limit);
			res.status(200).json({
				data: result,
				total: countDocuments
			})
		}
		catch (err) {
			res.status(400).json(err)
		}
	// }
})



productsRoute.get('/all-categories', async (req: Request, res: Response) => {
	try {
		let result = await categoryModel.find();

		res.status(200).json(result)
	}
	catch (err) {
		res.status(400)
	}
})

productsRoute.post("/add-product", verifyUser, async (req: Request, res: Response) => {
	let { name, brand, price, quantity, description, image, sizeVariants, colorVariants, category, featured } = req.body.data;
	console.log(req.body.data)
	const linkName = slugify(name.trim())
	colorVariants = colorVariants.split(" ");
	colorVariants = colorVariants.map((e: string) => {
		let f_index = e.slice(0,1).toUpperCase()
		let l_indexs = e.slice(1,).toLowerCase()
	return e === f_index + l_indexs
	})
	featured = featured == "true" ? true : false
	try {
		let findProduct = await productModel.findOne({ name: name }, { quantity: 1 })
		if (findProduct?.quantity && findProduct?.quantity !== 0) {
			let update = await productModel.findOneAndUpdate({ name: name }, { ...req.body.getBrandData }, { new: true })
			if (update) {
				return res.status(200).send("Product successfully updated")
			}
			else {
				return res.status(500).send("Failed to update product")
			}
		}
		else {
			try {
				let verifyProduct = new productModel({ name, brand, price, quantity, description, image, sizeVariants, colorVariants, category, linkName })
				await verifyProduct.save()
				res.status(201).send("Product successfully added")
			} catch (err: any) {
				res.status(400).json(err)
			}
		}
	}
	catch (err: any) {
		res.status(500).send("Server error")
	}
})


productsRoute.get("/all-brands", async (req: Request, res: Response) => {
	try {
		let result = await brandModel.find();
		res.status(200).json(result)
	}
	catch (err) {
		res.status(400).json(err)
	}
})

productsRoute.post("/add-product-category", verifyUser,  async (req: Request, res: Response) => {
	const { name } = req.body;
	try {
		let verifyCategory = await categoryModel.findOne({ name })
		if (verifyCategory) {
			res.status(409).json({message: "Category already exists"})
		}
		else {
			const category = new categoryModel({name});
			category.save()
				.then(() => {
					res.status(201).json({message: "Category added successfully"})
				})
				.catch((err) => {
					res.status(400).json({message: err.message})
				})
		}
	}
	catch (err: any) {
		res.status(400).json({ message: err.message })
	}
})

productsRoute.post("/add-brand", verifyUser, async (req: Request, res: Response) => {
	const { name, image, description } = req.body.data;
	try {
		let findBrand = await brandModel.findOne({ name: name })
		if (findBrand) {
			res.status(409).send("Brand already exists")
		} else {
			let verifyBrand = new brandModel({ name, image, description })
			verifyBrand.save()
			return res.status(201).send("Brand successfully added")
		}
	} catch (err) {
		return res.status(500).send("Failed to add brand")
	}
})


/**
 * endpoint for particular product
 */

productsRoute.get("/:product", async (req: Request, res: Response) => {
	const product = req.params.product;
	console.log(product)
	try {
		let result = await productModel.findOne({ linkName: product }).populate('brand').populate('category')
		if (result) {
			console.log(result)
			res.status(200).json(result)
		}
		else {
			res.status(404).send("Product not found")
		}
	} catch (err) {
		res.status(400).json(err)
	}
})

productsRoute.get("/search/:product", async (req: Request, res: Response) => {
	const product = req.params.product;
	try {
		let brand = await brandModel.findOne({ name: product })
		if (brand) {
			let result = await productModel.find({brand: brand._id}).populate({
				path: 'brand'
			})
			if (result) {
				res.status(200).json(result)
			}
			else {
				res.status(404).send("Product not found")
			}
		} else {
			res.status(400).send("Brand not found")
		}
	} catch (err) {
		res.status(400).json(err)
	}
})


/**
 *
 *
 */

productsRoute.get("/categories/:product", async (req: Request, res: Response) => {
	const product = req.params.product
	console.log(product)
	const pageCount: number = parseInt(req.query.page as string) || 0
	const limit: number = parseInt(req.query.limit as string) || 9
	try {
		let getCategory = await categoryModel.findOne({type: product})
		let documentCount = await productModel.find({category: getCategory?._id}).countDocuments();
		let result = await productModel.find({ category: getCategory?._id }).limit(9).skip(pageCount * limit)
		console.log(result)
		res.status(200).json({
			total: documentCount,
			data: result
		})
	} catch (err) {
		res.status(400).json(err)
	}
})
