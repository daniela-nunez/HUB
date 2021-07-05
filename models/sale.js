const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = Schema({
  productName: String,
  vendor: String,
  date: Date,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('sales', SaleSchema);
