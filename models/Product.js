import mongoose from "mongoose";

// ✅ Define the schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String, // ✅ Consider changing this to Number if price is numeric
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
  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },
   firm: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
  }],
});

 const Product = mongoose.model("Product", productSchema);

export default Product;
