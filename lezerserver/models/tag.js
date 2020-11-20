const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  title: {
    type: String,
    dropDups: true,
  },
  color: {
    type: String,
    match: /^#(?:[0-9A-Fa-f]{3}){1,2}$/,
  },
});

module.exports = mongoose.model('Tag', tagSchema);
