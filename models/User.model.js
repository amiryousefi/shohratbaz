const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  facebook: {
    id: {type: String},
    name: {type: String},
    access_token: {type: String}
  },
  created: {type: Date, default: Date.now},
});


// Export the model
module.exports = mongoose.model('User', UserSchema);