import mongoose from "mongoose";
import product from "./Product.js";
const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  region: {
    type: [
      {
        type: String,
        enum: ["south-india", "north-indian", "chinese", "bakery"],
      },
    ],
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ]
});
const Firm=mongoose.model("firm",firmSchema);
export default Firm;