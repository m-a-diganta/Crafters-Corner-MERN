const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['Category1', 'Category2', 'Category3'], required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  rating: [{
    rating: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Product', productSchema);