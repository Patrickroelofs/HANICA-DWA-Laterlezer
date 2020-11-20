const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    match: /^#(?:[0-9A-F]{3}){1,2}$/,
  },
});

module.exports = mongoose.model('Tag', tagSchema);
