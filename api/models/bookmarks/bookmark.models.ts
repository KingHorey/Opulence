import { Schema, model, Document, Types } from 'mongoose';

interface Bookmarks extends Document {
	user: string;
	products: Types.ObjectId[];
}

const BookmarksSchema = new Schema<Bookmarks>({
	user: {
		required: true,
		type: String
	},
	products: {
		required: true,
		type: [Schema.Types.ObjectId],
		ref: 'Product'
	}
})

export const bookmarkModel = model<Bookmarks>('Bookmarks', BookmarksSchema);
