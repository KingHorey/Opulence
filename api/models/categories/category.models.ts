import { Schema, model, Document, Types } from 'mongoose';

interface Category extends Document {
	name: string;
	image: string;
}

const CategorySchema = new Schema<Category>({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

export const categoryModel = model<Category>('Category', CategorySchema);
