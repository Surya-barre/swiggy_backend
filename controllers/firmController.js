import Firm from "../models/Firm.js";
import Vendor from "../models/Vendor.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Add firm controller
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;
        // console.log(req);
        // console.log(req.billa);
    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm=await firm.save();
    vendor.firm.push(savedFirm)
  await vendor.save();
    
    res.status(201).json({ message: "Firm added successfully", firm });
  } catch (err) {
    res.status(500).json({ error: "Failed to add firm", details: err.message });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId?.trim(); // ✅ Trim input

    // ✅ Check if firmId is valid
    if (!mongoose.Types.ObjectId.isValid(firmId)) {
      return res.status(400).json({ error: "Invalid firm ID" });
    }

    const deletedFirm = await Firm.findByIdAndDelete(firmId);

    if (!deletedFirm) {
      return res.status(404).json({ error: "No firm found" });
    }

    return res
      .status(200)
      .json({ message: "Firm deleted successfully", deletedFirm });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

export const addfirm = [upload.single("image"), addFirm];
export {deleteFirmById}
