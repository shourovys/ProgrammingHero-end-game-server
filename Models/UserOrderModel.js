const mongoose = require('mongoose');

const { Schema } = mongoose;

const userOrderSchema = new Schema(
  {
    orderService: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'panging',
    },
  },
  { timestamps: true },
);

const UserOrders = mongoose.model('UserOrders', userOrderSchema);

module.exports = UserOrders;
