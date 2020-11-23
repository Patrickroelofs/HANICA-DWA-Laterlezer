// eslint-disable-next-line no-underscore-dangle
let _User;

module.exports.auth = async (req, res, next) => {
  const user = await _User.getUserByUsername(req.headers.username);
  if (!user) {
    res.status(401).send('Invalid username');
  }
  req.user = user;
  next();
};

module.exports.setUserModel = (userModel) => _User = userModel;

module.exports.setUserModel(require('../models/user'));
