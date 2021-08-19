const UserOrders = require('../Models/UserOrderModel');

const OrderController = {};
OrderController.getOrders = async (req, res) => {
  const { page } = req.query;
  const { businessId } = req;

  try {
    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await UserOrders.countDocuments({ resId: businessId });
    const posts = await UserOrders.find({ resId: businessId })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

OrderController.updateOrder = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const updated = await UserOrders.findByIdAndUpdate(orderId, status, { new: true });
    res.send(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = OrderController;
