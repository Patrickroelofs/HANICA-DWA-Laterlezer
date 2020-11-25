const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  try {
    await User.findOne({ userName: req.body.userName }).then((exists) => {
      if (exists === null) {
        const user = new User({
          userName: req.body.userName,
        });

        user.save(((err) => {
          if (err) {
            res.status(404).send('User creation failed.');
          } else {
            res.status(200).send(user.userName);
          }
        }));
      } else {
        res.status(401).send('User already exists.');
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });

    if (user === null) {
      res.status(401).send('User not found');
    } else {
      res.send({
        username: user.userName,
        tags: user.tags,
      });
    }
  } catch (error) {
    next(error);
  }
};
