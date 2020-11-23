// eslint-disable-next-line no-underscore-dangle
let _User;

module.exports.auth = async (req, res, next) => {
  try {
    const user = await _User.getUserByUsername(req.headers.username);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.setUserModel = (userModel) => _User = userModel;

module.exports.setUserModel(require('../models/user'));
