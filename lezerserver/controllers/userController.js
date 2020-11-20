const mongoose = require('mongoose');
const User = require('../models/user');
const response = require('../utils/response');

exports.createTagPost = async (req, res, next) => {
  try {
    req.user.createTag(req.body);
    req.user.save();
    res.status(201).send(response('tag created', req.user.tags, true));
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
    });

    user.save(((err) => {
      if (err) {
        res.status(404).send('User creation failed.');
      } else {
        res.send(user);
      }
    }));
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    if (req.user === null) {
      res.status(401).send('User not found');
    } else {
      res.send(req.user);
    }
  } catch (err) {
    console.log(err);
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
