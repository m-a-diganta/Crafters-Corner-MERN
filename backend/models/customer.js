const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  cart: [{
      pid: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number}
      }],
  orderList: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

customerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Customers', customerSchema);
