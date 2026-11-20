 
 import Cart from "../models/CartModel.js"
 
 
 
 // Implementation for adding item to cart
export const addcart = async (req, res) => {
    try {
            const cart=req.body;
    const newCart = await Cart.create(cart);

    res.status(201).json({message:"cart added succesfully",success:true,newcart:newCart});
    } catch (error) {
        res.status(500).json({message:"Error Occured",success:false})
    }
};