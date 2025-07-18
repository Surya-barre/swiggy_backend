import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDb.js";
import venderRoutes from "./routes/vendorRoutes.js";
import firmRoutes from "./routes/firmRoutes.js";
import bodyParser from "body-parser";
import path from "path";
import productRoutes from "./routes/productRoutes.js";

// ✅ ADD THIS
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// ✅ USE CORS MIDDLEWARE HERE
// app.use(cors()); // 👈 This prevents the CORS error
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for development
      "https://suryaswiggyclone18.netlify.app", // your Netlify frontend
    ],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/vendor", venderRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

// Default route
app.use("/", (req, res) => {
  res.send("welcome to swiggy app");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
