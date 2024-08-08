import { Schema, model, Document, Types } from 'mongoose';
import { config } from 'dotenv'
config();

const defaultImageUrl = process.env.DEFAULT_IMAGE_URL as string;

export interface User extends Document {
	f_name: string;
	l_name: string;
	email: string;
	emailVerified: boolean;
	password: string;
	bookmarks?: Types.ObjectId[];
	profilePicture: string;
	purchaseHistory: Types.ObjectId[];
	isAdmin?: boolean;
	telephoneHome?: number;
	telephonePersonal?: number;
}


const UserSchema = new Schema<User>({
	f_name: {
		type: String,
		required: true
	},
	l_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	emailVerified: {
		type: Boolean,
		required: true,
		default: false
	},
	password: {
		type: String,
		required: true
	},
	bookmarks: {
		type: [Schema.Types.ObjectId]
	},
	profilePicture: {
		type: String,
		required: true,
		default: defaultImageUrl
	},
	purchaseHistory: {
		type: [Schema.Types.ObjectId]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	telephoneHome: {
		type: Number
	},
	telephonePersonal: {
		type: Number
	}
})


export const userModel = model<User>('User', UserSchema);
