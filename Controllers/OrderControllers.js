const UserOrders = require('../Models/UserOrderModel');

const OrderController = {};
OrderController.getUserOrders = async (req, res) => {
  try {
    const userOrders = await UserOrders.find({ userId: req.userId });
    res.send(userOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

OrderController.getAdminOrders = async (req, res) => {
  try {
    const orders = await UserOrders.find();
    res.send(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

OrderController.updateOrder = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const updated = await UserOrders.findByIdAndUpdate(orderId, status, {
      new: true,
    });
    res.send(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = OrderController;

OrderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;

    const newOrder = new UserOrders({ userId, ...req.body });

    const saveOrder = await newOrder.save();
    console.log(
      '🚀 ~ file: OrderControllers.js ~ line 48 ~ OrderController.createOrder= ~ saveOrder',
      saveOrder
    );

    res.send(saveOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = OrderController;
