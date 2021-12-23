import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "BILL";
const schema = new Schema({
  details: {
    type: String,
    required: [true, "Please add a company name"],
  },

  bill_date: {
    type: String,
    required: [true, "Please add a bill date"],
  },
  advance: {
    type: String,
    required: [true, "Please add a bill type"],
  },

  total_price: {
    type: String,
    required: [true, "Please add a bill amount"],
  },
  balance: {
    type: String,
    required: [true, "Please add a bill amount"],
  },

  remarks: {
    type: String,
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "BILL");
