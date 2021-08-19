const authController = {};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

// eslint-disable-next-line no-useless-escape
const reg_exp_for_email =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

authController.sineUp = async (req, res) => {
  try {
    const { username, email, phone, password, confirm_password } = req.body;

    if (!username || !email || !phone || !password || !confirm_password) {
      return res.status(400).json({ message: 'Not all field have been entered' });
    }
    if (!reg_exp_for_email.test(String(email).toLowerCase())) {
      return res.status(400).json({ message: 'please enter a valid email address' });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: 'The password need to be at least 6 characters long.',
      });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Enter the save password twice for verification.' });
    }
    const existingUser = await User.findOne({ email }, { email: 1 });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const saveUser = await newUser.save();

    const token = jwt.sign({ id: saveUser._id }, process.env.JWT_PASSWORD);
    return res.send({
      token,
      userInfo: {
        id: saveUser._id,
        name: saveUser.username,
        email: saveUser.email,
        isAdmin: saveUser.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Not all field have been entered' });
    }
    if (!reg_exp_for_email.test(String(email).toLowerCase())) {
      return res.status(400).json({ message: 'please enter a valid email address' });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: 'The password need to be at least 6 characters long.',
      });
    }
    const user = await User.findOne({ email }, { email: 1, password: 1, username: 1, isAdmin: 1 });
    if (!user) {
      return res.status(400).json({ message: 'No account with this email has been registers' });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: 'password incerate' });
    }
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD);
    return res.send({
      token,
      userInfo: {
        id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

authController.makeAdmin = async (req, res) => {
  try {
    const { userId } = req;

    const updated = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      {
        new: true,
      },
    );

    return res.send(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = authController;
