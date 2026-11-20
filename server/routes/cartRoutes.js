import express from "express"
import { addcart } from "../controllers/cartControllers.js"


const router=express.Router();

//creating cart route
router.post("/addcart",addcart);







export default router