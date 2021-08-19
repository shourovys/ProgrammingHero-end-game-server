const UserOrders = require('../Models/UserOrderModel');

const UserOrderController = {};

UserOrderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;

    const newOrder = new UserOrders({
      orderServices: req.body.orderServices,
      username: req.body.username,
      userId,
    });

    const saveOrder = await newOrder.save();

    return res.send({
      newOrder: saveOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
UserOrderController.getOrder = async (req, res) => {
  const { userId } = req;
  try {
    const currentOrder = await UserOrders.findOne({ userId }, {}, { sort: { createdAt: -1 } });
    if (currentOrder) {
      return res.send(currentOrder);
    }

    return res.send(null);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
module.exports = UserOrderController;
