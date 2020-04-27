const {Schema, model} = require('mongoose');

const schema = Schema({
  date: {type: Date, default: Date.now()},
  title: {type: String, required: true},
  description: {type: String},
  imageUrl: {type: String},
  type: {type: String}
});

module.exports = model('Post', schema);
