import express from "express";
import { getAllProducts } from "../controllers/productController.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);

export default router;