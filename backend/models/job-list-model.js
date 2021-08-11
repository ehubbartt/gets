import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  so: { type: String, required: true },
  pn: { type: String, required: true },
  bin: { type: String, required: true },
  dc: { type: String, required: true },
  due: { type: String, required: true },
  customer: { type: String, required: true },
  note: { type: String, required: false },
});

export const OrderModel = mongoose.model("order", OrderSchema);
