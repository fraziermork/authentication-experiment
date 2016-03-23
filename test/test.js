'use strict';
let chai            = require('chai');
let chaiHttp        = require('chai-http');
let superagent      = require('superagent');
chai.use(chaiHttp);
let expect          = chai.expect;
let request         = chai.request;

let User            = require(__dirname + '/../models/users.js');
require(__dirname + '/../server.js');

describe('server.js', () => {
  before('initial setup to populate a user', (done) => {
    User.remove({}).exec()
      .then(() => {
        superagent.get('http://localhost:3000/setup').end((err, res) => {
          if(err) console.log(err);
          done();
        });
      })
      .catch((err) => {
        console.log('Error setting up initial database state:', err);
      });
  });
  describe('/login', () => {
    it('should let you log in', (done) => {
      request('localhost:3000').post('/login')
      .auth('Nicholas', 'security')
      .end((err, res) => {
        console.log(res.body);
        expect(err).to.equal(null);
        expect(res.body.success).to.equal(true);
        expect(res.body).to.have.property('token');
        done();
      });
    });
  });
  
  
});
