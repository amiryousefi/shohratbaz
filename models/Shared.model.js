const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SharedSchema = new Schema({
  what: {
    post: {type: String, required: true},
    urls: [{type: String}],
  },
  where: [
    {
      platform: String,
      id: String,
      response: {}
    }
  ],
  when: {type: Date, default: Date.now},
  who: {},
  created: {type: Date, default: Date.now},
});


// Export the model
module.exports = mongoose.model('Shared', SharedSchema);