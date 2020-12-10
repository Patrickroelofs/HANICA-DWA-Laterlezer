const { Schema, model } = require('mongoose');

const tagSchema = Schema({
  title: {
    type: String,
    dropDups: true,
  },
  color: {
    type: String,
    match: /^#(?:[0-9A-Fa-f]{3}){1,2}$/,
  },
  children: [this],
});

module.exports = model('Tag', tagSchema);
