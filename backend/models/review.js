const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  customer: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' },
  seller: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  review: { type: String, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);