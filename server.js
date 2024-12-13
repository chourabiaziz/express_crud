/*const express = require("express")
const http = require("http");
const configdb = require("./config/db.json")
const path = require("path")
const mongoose = require("mongoose")
const app = express()
const server = http.createServer(app); 
 //app.set("views", path.join(__dirname,'views'))
//app.set("view engine" , "twig")
app.use(express.json())

app.use(express.urlencoded({extended : false}))

mongoose.connect(configdb.mongo.uri)

server.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000 ...");
});

//npm i nodemon -g

*/
const http = require("http");
const mongoose = require("mongoose");
const configdb = require("./config/db.json"); // Your MongoDB configuration
const app = require("./app"); // Import your Express application

// Create the HTTP server using Express app
const server = http.createServer(app);

// Connect to MongoDB using the URI from db.json
mongoose.connect(configdb.mongo.uri)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
