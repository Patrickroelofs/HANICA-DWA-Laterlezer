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

// eslint-disable-next-line no-return-assign
module.exports.setUserModel = (userModel) => _User = userModel;

module.exports.setUserModel(require('../models/user'));
