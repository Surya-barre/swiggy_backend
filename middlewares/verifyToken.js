import Vendor from "../models/Vendor.js"; // Importing the Vendor model
import jwt from "jsonwebtoken"; // Import JWT library
import dotenv from "dotenv"; // Import dotenv to use env variables
dotenv.config(); // Load environment variables

const secretKey = process.env.SecretKey; // Read the secret key from .env

const verifytoken = async (req, res, next) => {
  const token = req.headers.token; // Get token from the headers

  // 1. If token not found in request headers
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    // console.log(token)
    // 2. Verify the token using jwt and the secret key
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded)

    // 3. Extract vendorId from the token payload
    const vendor = await Vendor.findById(decoded.vendorId);

    // 4. If vendor not found in database
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // 5. Attach vendor ID to the request object for future use
    req.vendorId = vendor._id;
    //  req.billa="kingkohli"
    // 6. Continue to the next middleware or route handler
    next();
  } catch (err) {
    // 7. If any error occurs (invalid token, expired token, etc.)
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
export default verifytoken;