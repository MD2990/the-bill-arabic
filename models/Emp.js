import mongoose, { Schema } from 'mongoose';

const MODEL_NAME = 'Emp';
const schema = new Schema({
	job: {
		type: String,
		required: [true, 'Please add a job'],
	},
	emp_name: {
		type: String,
		required: [true, 'Please add employee name'],
	},
	civil_id: {
		type: String,
		required: [true, 'Please add a civil ID'],
	},
	passport_number: {
		type: String,
		required: [true, 'Please add a passport number'],
	},
	empl_Date: {
		type: String,
		required: [true, 'Please add employment date'],
	},

	notes: {
		type: String,
	},
});

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, schema, 'emp');
