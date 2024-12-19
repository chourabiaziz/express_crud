const Produit = require("../models/produit"); // Adjust the path as necessary

class produitService {
    /**
     * Calculate the average price of products.
     * @returns {Promise<number|null>} The average price or null if no products are found.
     */
    static async getAveragePrice() {
        try {
            const result = await Produit.aggregate([
                { $group: { _id: null, avgPrice: { $avg: "$price" } } }
            ]);

            if (!result || result.length === 0) {
                return null; // No products found
            }

            return result[0].avgPrice; // Return the average price
        } catch (error) {
            console.error("Error fetching average price:", error);
            throw new Error("Unable to calculate average price");
        }
    }
}

module.exports = produitService;
