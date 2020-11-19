const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  title: String,
  color: String,
});

module.exports = mongoose.model('Tag', tagSchema);
