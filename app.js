const express = require('express');
const path = require('path'); // Utile si vous travaillez avec des fichiers
const contactRouter = require('./routes/contact'); // Importez vos nouvelles routes de contact

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Définir une route par défaut (racine de l'API)
app.get('/', (req, res) => {
    res.send("Bienvenue dans l'API de gestion des contacts !");
});

// Montez la nouvelle route /contact
app.use('/contact', contactRouter);

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).json({ error: "Route non trouvée" });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Erreur interne du serveur" });
});

// Exportez l'application
module.exports = app;
