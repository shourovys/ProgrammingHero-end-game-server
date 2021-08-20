const Service = require('../Models/ServiceModel');

const ServiceController = {};

ServiceController.addService = async (req, res) => {
  console.log(
    '🚀 ~ file: ServiceControllers.js ~ line 24 ~ ServiceController.addService= ~ req.body',
    req.body,
  );
  try {
    const newService = new Service(req.body);

    const saveService = await newService.save();
    console.log(
      '🚀 ~ file: ServiceControllers.js ~ line 10 ~ ServiceController.addService= ~ saveService',
      saveService,
    );
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
