const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");
const { uploadFileToR2 } = require("../config/uploadToR2");


exports.fetchProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const offset = (page - 1) * limit;


        const where = {
            isDeleted: false,
        };

        const filterKeys = [
            "Shape",
            "Pair",
            "Product_Type",
            "Carat",
            "Fancy_Color_Dominant_Color",
            "Color",
            "Fancy_Color_Overtone",
            "Clarity",
            "Fancy_Color_Intensity",
            "Fluor_Intensity",
            "Lab",
            "Certification",
            "Culet_Carat",
        ];

        filterKeys.forEach((key) => {
            const val = req.query[key];
            if (val && val !== "") {
                where[key] = val; // exact match
            }
        });

        const products = await prisma.product.findMany({
            where,
            skip: offset,
            take: limit,
        });


        res.json({ page, products });
    } catch (err) {
        console.error("Fetch product error:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};






exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const uploads = [];


        // Handle uploaded files
        for (const file of req.files) {
            const filePath = path.join(__dirname, "../uploads", file.filename);
            const fileBody = fs.readFileSync(filePath);

            const public_url = process.env.R2_PUBLIC_URL;

            let folder = '';
            let fileUrl = '';

            if (file.fieldname === 'Video') {
                folder = 'videos';
                fileUrl = `${public_url}/${folder}/${file.filename}`;
                productData.Video = fileUrl;
            } else if (file.fieldname === 'Image') {
                folder = 'images';
                fileUrl = `${public_url}/${folder}/${file.filename}`;
                productData.Image = fileUrl;
            } else if (file.fieldname === 'Certificate_Image') {
                folder = 'certificate';
                fileUrl = `${public_url}/${folder}/${file.filename}`;
                productData.Certificate_Image = fileUrl;
            }


            await uploadFileToR2(`${folder}/${file.filename}`, fileBody, file.mimetype);
            uploads.push(filePath);
        }


        productData.Stock = parseInt(productData.Stock, 10);
        productData.Price = parseInt(productData.Price, 10);
        productData.Discount = parseInt(productData.Discount, 10);
        productData.Final_Price = parseInt(productData.Final_Price, 10);




        const newProduct = await prisma.product.create({
            data: productData,
        });

        uploads.forEach(filePath => fs.unlinkSync(filePath));

        res.status(201).json({
            success: true,
            message: "Product added and files uploaded to R2",
            product: newProduct,
        });
    } catch (e) {
        console.error("Add Product Error:", e);
        res.status(500).json({
            success: false,
            message: "Failed to add product",
            error: e.message,
        });
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        // Optional: Check if product exists first
        const product = await prisma.product.findUnique({
            where: { Product_Id: Number(id) },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await prisma.product.update({
            where: { Product_Id: Number(id) },
            data: { isDeleted: true },
        });

        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);

        // Check if error is due to foreign key constraint violation
        if (error.code === 'P2003') {
            // Prisma foreign key constraint error code
            return res.status(409).json({
                error: 'Cannot delete product because it is referenced by other records (e.g. orders).',
            });
        }

        return res.status(500).json({ error: 'Failed to delete product' });
    }
};






