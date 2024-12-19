const mongoose = require("mongoose");
const yup = require("yup");

// Schéma de validation avec Yup
const produitSchemaValidation = yup.object().shape({
    name: yup.string().required("Le nom du produit est requis").min(3, "Le nom doit comporter au moins 3 caractères"),
    price: yup.number().required("Le prix est requis").positive("Le prix doit être un nombre positif").min(1, "Le prix doit être supérieur à 0"),
    material: yup.string().min(3, "Le matériau doit comporter au moins 3 caractères").max(15, 'Le matériau ne peut pas dépasser 15 caractères').optional().nullable(),
});

// Définition du schéma Mongoose pour le produit
const produitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    material: {
        type: String,
        required: false,
    },
});

// Méthode pour valider un produit avant de l'enregistrer
produitSchema.methods.validateProduit = async function () {
    try {
        await produitSchemaValidation.validate({
            name: this.name,
            price: this.price,
            material: this.material
        });
        return true;  // Si la validation réussit
    } catch (err) {
        throw new Error(err.errors.join(", "));  // Retourner une erreur avec les messages de validation
    }
};

// Création du modèle Mongoose
const Produit = mongoose.model("Produit", produitSchema);

module.exports = Produit;
