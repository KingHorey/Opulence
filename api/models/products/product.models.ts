import { Schema, model, Document, Types } from 'mongoose';

interface Product extends Document {
	name: string;
	brand: Types.ObjectId;
	price: number;
	quantity: number;
	description: string;
	image: string;
	sizeVariants: string[],
	colorVariants: string[],
	category: Types.ObjectId;
	featured: boolean
}


const ProductSchema = new Schema<Product>({
	name: {
		type: String,
		required: true
	},
	brand: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Brand'
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	sizeVariants: {
		type: [String],
		required: true
	},
	colorVariants: {
		type: [String],
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Category'
	},
	featured: {
		type: Boolean,
		required: true,
		default: false
	}
});


export const productModel = model<Product>('Product', ProductSchema);
