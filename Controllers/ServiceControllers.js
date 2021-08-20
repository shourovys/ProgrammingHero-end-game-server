const Service = require('../Models/ServiceModel');

const ServiceController = {};

ServiceController.addService = async (req, res) => {
  try {
    const newService = new Service(req.body);

    const saveService = await newService.save();
    return res.send(saveService);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
ServiceController.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    return res.send(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

ServiceController.getServices = async (req, res) => {
  try {
    const services = await Service.find();

    return res.send(services);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = ServiceController;
