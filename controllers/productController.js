// ✅ FIXED: Capitalized model name to follow convention and avoid naming conflicts
import Firm from "../models/Firm.js";
import Product from "../models/Product.js"; // Changed from `product` to `Product`

// ✅ FIXED: Added missing path module import for handling file extensions
import multer from "multer";
import path from "path"; // <-- Added this line
import mongoose from "mongoose";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Using `path` here — needed to import it
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = req.params.firmId;
    //  console.log(firmId)
    const firm = await Firm.findById(firmId);
    if (!firm) {
       return res.status(404).json({ error: "No firm found" });
    }

     const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });

    const savedProduct = await product.save();
    firm.product.push(savedProduct);
    await firm.save();

    res.status(200).json(savedProduct);
  } catch (error) {
     console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProductByFirm=async(req,res)=>{
    try{
        const firmId=req.params.firmId;
         const firm=await Firm.findById(firmId);
         
         if(!firm){
            return res.status(404).json({error:"no firm found"})
        }
        const restaurantName=firm.firmName;
        const products=await Product.find({firm:firmId})
        res.status(200).json({ restaurantName,products });
    }catch(err){
        console.log(err)
res.status(500).json({err:"internal server error"})
    }
}
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId?.trim(); // ✅ Trim ID

    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "No product found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};
 export const addProductRoute = [upload.single("image"), addProduct
 ];
 export  {getProductByFirm,deleteProductById}

