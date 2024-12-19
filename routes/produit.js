const express = require("express");
const ProduitService = require("../services/produitService");
const Produit = require("../models/produit");
const router = express.Router();

// Render the chat page
router.get("/socket", (req, res) => {
    res.render("index");
});

// Add a new product
router.post("/add", async (req, res) => {
    try {
        const { name, price, material } = req.body;
        const produit = new Produit({ name, price, material });

        // Save the product
        await produit.save();

        res.json({
            success: true,
            message: "Produit ajouté avec succès.",
            produit,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'ajout du produit." });
    }
});

// Get all products
router.get("/", async (req, res) => {
    try {
        const produits = await Produit.find();
        res.json({ success: true, produits });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

// Get products with price above average
router.get("/avg/moy", async (req, res) => {
    try {
        const avgPrice = await ProduitService.getAveragePrice();
        if (!avgPrice) {
            return res.status(404).json({ error: "Aucun produit trouvé." });
        }

        const produits = await Produit.find({ price: { $gt: avgPrice } });
        res.json({ success: true, averagePrice: avgPrice, produits });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

// Get products by name
router.get("/name", async (req, res) => {
    try {
        const { name } = req.query;
        const produits = await Produit.find({ name: { $regex: new RegExp(name, "i") } });
        res.json({ success: true, produits });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

// Delete a product by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Produit.findByIdAndDelete(id);
        res.json({ success: true, deleted: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

// Update a product by ID
router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const produit = await Produit.findByIdAndUpdate(id, updates, { new: true });
        res.json({ success: true, produit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

module.exports = router;
