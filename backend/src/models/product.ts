import { Document, Schema, model, Mongoose } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export interface ProductInterface extends Document {
	name: string,
	description: string,
	url: string,
	createdAt: Date

	getReturnJson(): any
}

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	url: {
		type: String
	},
	createAt: {
		type: Date,
		default: Date.now
	}
})

ProductSchema.plugin(mongoosePaginate)

ProductSchema.methods.getReturnJson = function () {
	const returnJson = this.toJSON()

	return returnJson
}

export const Product = model<ProductInterface>('product', ProductSchema);
