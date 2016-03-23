'use strict';

// let jwt           = require('jsonwebtoken');
let mongoose      = require('mongoose');
let morgan        = require('morgan');
let bodyParser    = require('body-parser');
let express       = require('express');
let app           = express();

let loginRouter   = require(__dirname + '/routes/login.js')(express.Router());
let User          = require(__dirname + '/models/users.js');
let config        = require(__dirname + '/config.js');

// let apiRoutes     = express.Router();

mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/setup', (req, res) => {
  var nick = new User({
    username: 'Nicholas',
    password: 'security',
    admin: true
  });
  nick.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({success: true});
  });
});

app.use('/login', loginRouter);


// apiRoutes.post('/authenticate', (req, res) => {
//   User.findOne({username: req.body.username}).exec()
//   .then((user) => {
//     if (! user){
//       return res.json({success: false, message: 'Authentication failed, user not found'});
//     }
//     if (user.password !== req.body.password) {
//       return res.json({success: false, message: 'Authentication failed, incorrect password'});
//     }
//     let token = jwt.sign(user, app.get('superSecret'), {
//       expiresInMinutes: 1440
//     });
//     res.json({success:true , message: 'congrats', token: token});
//   })
//   .catch((err) => {
//     throw err;
//   });
// });

// apiRoutes.use((req, res, next) => {
//   let token = req.body.token || req.query.token || req.headers['x-access-token'];
//   if (! token){
//     return res.status(403).json({sucess: false, message: 'no token provided'});
//   }
//   
//   jwt.verify(token, app.get('superSecret'), (err, decoded)=> {
//     if (err){
//       return res.json({sucess: false, message: 'authentication failed'});
//     }
//     req.decoded = decoded;
//     next();
//   });
// });
// 
// apiRoutes.get('/', (req, res) => {
//   res.json({message: 'Welcome'});
// });
// 
// apiRoutes.get('/users', (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) throw err;
//     res.json(users);
//   });
// });

// app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('server started on 3000');
});
