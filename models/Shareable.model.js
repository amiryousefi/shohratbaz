const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShareableSchema = new Schema({
  url: {type: String},
  user: {},
  created: {type: Date, default: Date.now},
});


// Export the model
module.exports = mongoose.model('Shareable', ShareableSchema);