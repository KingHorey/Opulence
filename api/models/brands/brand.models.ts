import { Schema, model, Document, Types } from 'mongoose';

interface Brand extends Document {
	name: string;
	image: string;
}

const BrandSchema = new Schema<Brand>({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

export const brandModel = model<Brand>('Brand', BrandSchema);
