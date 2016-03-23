'use strict';
// let jwt = require('jsonwebtoken');
let User = require(__dirname + '/../models/users.js');

module.exports = function(router) {
  router.post('/', (req, res) => {
    console.log('POST request made to /login');
    let authorizationHeadersArray = req.headers.authorization.split(' ');
    let b64EncodedUsernamePassword = authorizationHeadersArray[1];
    let authorizationArray = new Buffer(b64EncodedUsernamePassword, 'base64').toString().split(':');
    let username = authorizationArray[0];
    console.log('username is ' + username);
    let password = authorizationArray[1];
    
    User.findOne({username: username}).exec()
      .then((user)=>{
        let valid = user.compareHash(password);
        if(!valid){
          return res.status(400).json({success: false, message: 'incorrect password'});
        }
        res.json({success: true, token: user.generateToken()});
      })
      .catch((err)=>{
        res.status(500).json({success: false, message: 'Server error finding user'});
      });
  });
  
  return router;
};
