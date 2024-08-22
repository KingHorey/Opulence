import { Schema, model, Document, Types, Date } from 'mongoose';

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
	featured: boolean;
	gender: string[];
	createdAt: Date;
	linkName: string;
	// review:
}

interface ProductType extends Document {
	name: string;
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
	linkName: {
		type: String,
		required: true
	},
	featured: {
		type: Boolean,
		required: true,
		default: false
	},
	// type: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "ProductType"
	// },
	gender: {
		type: [String],
		enum: ["male", "female", "unisexual", "children"],
		required: true
	}
});

// const TypeSchema = new Schema<ProductType>({
// 	name: {
// 		type: String,
// 		enum: ["male", "female", "unisexual", "children"],
// 		required: true
// 	}
// });


export const productModel = model<Product>('Product', ProductSchema);
// export const productTypeModel = model <ProductType>('ProductType', TypeSchema)
