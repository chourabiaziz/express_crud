const express = require("express");
const path = require("path");
const produitRouter = require("./routes/produit");

const app = express();

// Set up Twig as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// Middleware for JSON parsing
app.use(express.json());

// Mount the Produit router
app.use("/produit", produitRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Bienvenue dans l'API de gestion des produits !");
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: "Route non trouvée" });
});

// Global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Erreur interne du serveur" });
});

module.exports = app;
