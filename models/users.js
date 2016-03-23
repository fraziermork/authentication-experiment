'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  admin:    {type: Boolean, default: false}
});

userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

userSchema.methods.compareHash = function(inputPassword){
  return bcrypt.compareSync(inputPassword, this.password, bcrypt.genSaltSync(10));
};

userSchema.methods.generateToken = function(){
  return jwt.sign({_id: this.id}, process.env.SECRET_TOKEN_SIGN_KEY || 'Change me');
};

module.exports = mongoose.model('User', userSchema);
