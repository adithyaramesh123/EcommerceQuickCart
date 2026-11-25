
import Product from '../models/productModel.js';

// ==============================
// ADD PRODUCT
// ==============================
export const addProduct = async (req, res) => {
    try {
        const {
            productName,
            description,
            price,
            discountPrice,
            category,
            brand,
            images,
            stock,
            sizes,
            colors,
            ratings,
            numReviews,
            isFeatured,
            isActive
        } = req.body;

        const newProduct = await Product.create({
            productName,
            description,
            price,
            discountPrice,
            category,
            brand,
            images,
            stock,
            sizes,
            colors,
            ratings,
            numReviews,
            isFeatured,
            isActive
        });

        return res.status(201).json({
            success: true,
            message: 'Product Added Successfully',
            product: newProduct
        });

    } catch (error) {
        console.error('Add Product Error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Error adding product',
            error: error.message
        });
    }
};



// GET ALL PRODUCTS

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            products
        });

    } catch (error) {
        console.error('Get Products Error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};


// GET SINGLE PRODUCT

export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            product
        });

    } catch (error) {
        console.error('Get Single Product Error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};



// UPDATE PRODUCT

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });

    } catch (error) {
        console.error('Update Product Error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};



// DELETE PRODUCT

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error('Delete Product Error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};
