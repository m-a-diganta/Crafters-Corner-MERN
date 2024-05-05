const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  pid: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true }
});

const orderSchema = new Schema({
  OrderID: { type: String, required: true, unique: true },
  productList: [orderItemSchema],
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'processing', 'delivered'], required: true },
  category: { type: String, enum: ['Category1', 'Category2', 'Category3'], required: true }
});

module.exports = mongoose.model('Order', orderSchema);