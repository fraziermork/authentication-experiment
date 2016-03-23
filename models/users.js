'use strict';
var mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  admin:    {type: Boolean, default: false}
});

// userSchema.methods

module.exports = mongoose.model('User', userSchema);
