import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "BILL";
const schema = new Schema({
  company_name: {
    type: String,
    required: [true, "Please add a company name"],
  },
  bill_number: {
    type: String,
    required: [true, "Please add a bill number"],
  },
  bill_date: {
    type: String,
    required: [true, "Please add a bill date"],
  },
  bill_type: {
    type: String,
    required: [true, "Please add a bill type"],
  },
  bill_amount: {
    type: String,
    required: [true, "Please add a bill amount"],
  },
  payment_status: {
    type: Boolean,
    default: false,
    required: [true, "Please add a payment status"],
  },
  check_date: {
    type: String,
    default: "2010-01-01",
  },

  notes: {
    type: String,
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "BILL");
