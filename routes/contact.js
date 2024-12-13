const express = require('express');
const Contact = require('../models/contact'); // Corrected to the proper model name
const router = express.Router();

router.post('/new', async (req, res) => {
    const { name, phone } = req.body;

    // Use logical OR (||) instead of bitwise OR (|) for validation
    if (!name || !phone) {
        return res.status(400).json({ error: "Tous les champs sont requis !" });
    }

    try {
        // Create a new contact message in the database
        const newContact = new Contact({ name, phone });

        // Save the new contact
        await newContact.save();

        res.json({
            success: true,
         });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

router.get('/', async (req, res) => {
    try {
        // Fetch all contacts from the database
        const contacts = await Contact.find();

        // Check if there are any contacts
        if (contacts.length === 0) {
            return res.status(404).json({ error: "Aucun contact trouvé." });
        }

        // Return the contacts as a response
        res.json({
            success: true,
            contacts: contacts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});





router.delete('/delete/:phone', async (req, res) => {
    try {
        const { phone } = req.params;
        const contacts = await Contact.deleteOne({phone});

         if (contacts.length === 0) {
            return res.status(404).json({ error: "Aucun contact trouvé." });
        }

        // Return the contacts as a response
        res.json({
            success: true,
            
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});



router.put('/edit/:phone', async (req, res) => {
    try {
        const { phone } = req.params; // Extract the phone number from the URL parameters
        const { name, newPhone } = req.body; // Extract new data (name, newPhone) from the request body

         if (!name && !newPhone) {
            return res.status(400).json({ error: "Vous devez fournir au moins un champ à mettre à jour (nom ou téléphone)." });
        }

        // Update the contact by phone
        const updatedContact = await Contact.findOneAndUpdate(
            { phone }, // Find the contact by phone number
            { $set: { name, phone: newPhone || phone } }, // Set the new values (use newPhone if provided)
            { new: true } // Return the updated contact
        );

        // If the contact was not found
        if (!updatedContact) {
            return res.status(404).json({ error: "Aucun contact trouvé avec ce numéro de téléphone." });
        }

        // Return the updated contact as a response
        res.json({
            success: true,
            message: "Contact mis à jour avec succès.",
            contact: updatedContact
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;
