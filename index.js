import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDb.js";
import venderRoutes from "./routes/vendorRoutes.js";
import firmRoutes from "./routes/firmRoutes.js";
import bodyParser from "body-parser";
import path from "path";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); 

// Routes
app.use("/vendor", venderRoutes);
app.use("/firm", firmRoutes);
app.use("/product",productRoutes);

 
// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
