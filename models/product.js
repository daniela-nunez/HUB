const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: String,
  description: String,
  price: Number
});

module.exports = mongoose.model('products', ProductSchema);
