const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");
const produitService = require("./services/produitService"); // Adjust path as needed
const mongoose = require("mongoose");
const configDb = require("./config/db.json");

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }, // Allow all origins for development
});

 



mongoose.connect(configDb.mongo.uri);




io.on("connection", async (socket) => {
    console.log("A client connected.");

    try {
        // Fetch average price dynamically from produitService
        const avgPrice = await produitService.getAveragePrice();
        console.log("Average price fetched:", avgPrice); // Log the fetched average price

        if (avgPrice !== null) {
            socket.emit("avgPrice", { avgPrice });  // Emit the average price to the client
        } else {
            socket.emit("avgPrice", { avgPrice: "No products available" });
        }
    } catch (error) {
        console.error("Error fetching average price:", error);
        socket.emit("avgPrice", { avgPrice: "Error calculating average price" });
    }

    socket.on("disconnect", () => {
        console.log("A client disconnected.");
    });
});



mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB successfully.");
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
