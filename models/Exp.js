import mongoose, { Schema } from 'mongoose';

const MODEL_NAME = "EXP";
const schema = new Schema({
  elc: {
    type: String,
    required: [true, "Please add a electricity value"],
  },
  rent: {
    type: String,
    required: [true, "Please add a rent value"],
  },
  g_exp: {
    type: String,
    required: [true, "Please add a garage expenses value"],
  },
  workPrice: {
    type: String,
    required: [true, "Please add a  work price value"],
  },
  other_exp: {
    type: String,
    required: [true, "Please add a other expenses value"],
  },
  total_profit: {
    type: String,

    required: [true, "Please add a total profit value"],
  },
  total_loss: {
    type: String,

    required: [true, "Please add a total loss value"],
  },
  added_date: {
    type: String,
    required: [true, "Please add a added date value"],
  },

  remarks: {
    type: String,
    default: " لا يوجد ملاحظات",
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "EXP");
