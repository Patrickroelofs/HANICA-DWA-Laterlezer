const mongoose = require('mongoose');
const User = require('../models/user');
const response = require('../utils/response');

exports.createTagPost = async (req, res, next) => {
  try {
    const user = await User.getUserByUsername(req.params.username);
    user.createTag(req.body.tags);
    user.save();
    res.status(201).send(response('tag created', user.tags, true));
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User({
      userName: req.body.userName,
    });

    user.save(((err) => {
      if (err) {
        res.status(404).send('User creation failed.');
      } else {
        res.send(user.userName);
      }
    }));
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });

    if (user === null) {
      res.status(401).send('User not found');
    } else {
      res.send(user.userName);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getTagsGet = async (req, res, next) => {
  try {
    const user = await User.getUserByUsername(req.params.username);
    const tags = await user.getTags();
    res.status(200).send(response(`all tags from ${user.userName}`, tags, true));
  } catch (error) {
    next(error);
  }
};
