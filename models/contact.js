const mongoose = require("mongoose")

const contact = new mongoose.Schema({
    name: {
        type: String,
     },
    phone: {
        type: String,
     },

})

const Contact = mongoose.model("contacts" , contact)
module.exports = Contact
 