import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  priority: { type: Number, required: true },
  name: { type: String, required: true },
  dc: { type: String, required: true },
  pn: { type: String, required: true },
  so: { type: String, required: true },
  date: { type: String, required: true },
});

export const OrderModel = mongoose.model("order", OrderSchema);
