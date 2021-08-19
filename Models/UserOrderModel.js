const mongoose = require('mongoose');

const { Schema } = mongoose;

const userOrderSchema = new Schema(
  {
    orderServices: {
      type: [Object],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'panging',
    },
  },
  { timestamps: true },
);

const UserOrders = mongoose.model('UserOrders', userOrderSchema);

module.exports = UserOrders;
