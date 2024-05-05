const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productList: [{
    pid: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'processing', 'delivered'], required: true },
  category: { type: String, enum: ['Category1', 'Category2', 'Category3'], required: true }
});

module.exports = mongoose.model('Order', orderSchema);