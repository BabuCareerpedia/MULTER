const mongoose = require('mongoose');
console.log("object")
// Define your schema
const imageSchema = new mongoose.Schema({
  name: {
    type: String, // Ensure the type is correctly defined
    required: true, // You can make it required if necessary
  },
});

// Create the model
const Image = mongoose.model('Image', imageSchema);

module.exports = {Image};