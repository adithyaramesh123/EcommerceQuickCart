
import express from 'express';

import {
    addProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct
} from '../controllers/productControllers.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

export default router;
