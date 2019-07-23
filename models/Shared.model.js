const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SharedSchema = new Schema({
  what: {type: String, required: true},
  where: {},
  when : { type: Date, default: Date.now },
  who :{},
  created : { type: Date, default: Date.now },
});


// Export the model
module.exports = mongoose.model('Shared', SharedSchema);