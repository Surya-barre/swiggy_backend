import express from "express";
import { addfirm, deleteFirmById } from "../controllers/firmController.js";
import verifytoken from "../middlewares/verifyToken.js";

const router = express.Router();

 
router.post("/addfirm",verifytoken,...addfirm);  
router.delete("/:firmId",deleteFirmById)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
});


export default router;
