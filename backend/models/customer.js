const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  pid: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true }
});

const customerSchema = new Schema({
  CustomerID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  cart: [cartItemSchema],
  orderList: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('Customer', customerSchema);
