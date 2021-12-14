import mongoose, { Schema } from 'mongoose';

const MODEL_NAME = 'DailySell';
const schema = new Schema({
	sale_amount: {
		type: String,
		required: [true, 'Please add a daily sale amount'],
	},
	expe: {
		type: String,
		required: [true, 'Please add expenses amount'],
	},
	sell_date: {
		type: String,
		required: [true, 'Please add date'],
	},
	deposit: {
		type: String,
		required: [true, 'Please add deposit amount'],
	},
});

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, schema, 'dailySell');
