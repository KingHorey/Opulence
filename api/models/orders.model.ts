import { Schema, Document, model, Types } from "mongoose";

export interface Order extends Document {
	user: Types.ObjectId;
	products: {
		product: string;
		quantity: number;
	}[];
	total: number;
}

const OrderSchema = new Schema<Order>({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	products: [{
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true
		},
		quantity: {
			type: Number,
			required: true
		}
	}],
	total: {
		type: Number,
		required: true
	}
})

export const orderModel = mode<Order>('Orders', OrderSchema)
