const mongoose = require('mongoose');
const User = require('../models/user');
const response = require('../utils/response');

exports.createTagPost = async (req, res, next) => {
  try {
    req.user.createTag(req.body.tags);
    req.user.save();
    res.status(201).send(response('tag created', req.user.tags, true));
  } catch (error) {
    next(error);
  }
};

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
      res.send(user.userName);
    }
  } catch (error) {
    next(error);
  }
};

exports.getTagsGet = async (req, res, next) => {
  try {
    const tags = await req.user.getTags();
    res.status(200).send(response(`all tags from ${req.user.userName}`, tags, true));
  } catch (error) {
    next(error);
  }
};
