process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

const jsonServer = require('json-server') //New adition: fake server to tests
const altServer = jsonServer.create() // Source: https://github.com/typicode/json-server
const router = jsonServer.router('db.json')

altServer.use(jsonServer.bodyParser);
altServer.use(router)
altServer.listen(3001, () => {
  // console.log('JSON Server is running')
})

chai.use(chaiHttp);
//Our parent block

describe('API', () => {
  /*
    * Test the /GET route
    */
  describe('/GET', () => {
    it('it should GET any reply', (done) => {
      chai.request(altServer)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should GET movies info ', (done) => {
      chai.request(altServer)
        .get('/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          done();
        });
    });
    it('it should GET reviewers info', (done) => {
      chai.request(altServer)
        .get('/reviewers')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          done();
        });
    });
    it('it should GET publications info', (done) => {
      chai.request(altServer)
        .get('/publications')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          done();
        });
    });
    it('it should GET pending info', (done) => {
      chai.request(altServer)
        .get('/pending')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          done();
        });
    });
  });
});