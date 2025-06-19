import { vendorRegister,vendorLogin, getAllVendors, getVendorById } from "../controllers/vendorController.js";
import express from "express"
const router=express.Router();
router.post('/register',vendorRegister);
router.get('/all-vendors',getAllVendors)
router.get('/single-vendor/:id',getVendorById);
router.post('/login',vendorLogin);
export default router;

