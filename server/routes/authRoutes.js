//modular routing need express
import express from "express";
import {login, register } from "../controllers/authcontrollers.js";


const router=express.Router();

//creating POst route
router.post("/register", register);
//creating Login Route
router.post("/login",login);



export default router