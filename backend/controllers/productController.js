import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
    // GET ALL PRODUCTS
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;

        res.status(200).json({ success:true, data: products });
    } catch (error) {
        console.log("Error getProducts ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getProduct = async (req, res) => {
    // GET A PRODUCT
    const { id } = req.params;

    try {
        await sql`
            
        `;
    } catch (error) {
        console.log("Error in getProduct ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createProduct = async (req, res) => {
    // CREATE A PRODUCT
    const {name,price,image} = req.body;

    if(!name || !price || !image) {
        return res.status(400).json({ success:false, message: "All fields are required" });
    }

    try {
        const newProduct = await sql`
            INSERT INTO products (name,price,image)
            VALUES (${name},${price},${image})
            RETURNING *
        `;

        res.status(200).json({ success:true, data: newProduct[0] });
    } catch (error) {
        console.log("Error in createProduct ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateProduct = async (req, res) => {
    // UPDATE A PRODUCT
};

export const deleteProduct = async (req, res) => {
    // DELETE A PRODUCT
};