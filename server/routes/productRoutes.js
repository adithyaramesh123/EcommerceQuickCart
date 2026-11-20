import express from 'express'
import { addProduct, getAllProducts } from '../controllers/productControllers.js'
import authenticate from '../middlewares/authMiddleware.js';

const router=express.Router();


router.post("/addproduct", authenticate, addProduct)
router.get("/addproduct",getAllProducts)









export default router