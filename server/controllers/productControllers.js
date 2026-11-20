import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await Product.create(product);

        return res.status(201).json({
            message: "Product Added Successfully",
            success: true,
            newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error adding product",
            success: false,
            error: error.message,
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching products",
            success: false,
            error: error.message,
        });
    }
};