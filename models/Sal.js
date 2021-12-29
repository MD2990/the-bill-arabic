import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Sal";
const schema = new Schema({

  emp_name: {
    type: String,
    required: [true, "Please add employee name"],
  },
  basic_salary: {
    type: String,
    required: [true, "Please add a basic salary"],
  },
  bonus: {
    type: String,
    required: [true, "Please add  bonus amount"],
  },

  loans: {
    type: String,
    required: [true, "Please add  deductions amount"],
  },
  total_salary: {
    type: String,
    required: [true, "Please add total salary amount "],
  },
  salary_date: {
    type: String,
    required: [true, "Please add salary date "],
  },
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emp",
  },

  remarks: {
    type: String,
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "Sal");
