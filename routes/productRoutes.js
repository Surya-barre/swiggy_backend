import express from "express"
import { addProductRoute, deleteProductById, getProductByFirm } from "../controllers/productController.js"
const router=express.Router();
router.post("/add-product/:firmId",addProductRoute);
router.get("/:firmId/products",getProductByFirm)
router.delete("/:productId",deleteProductById);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

export default router;