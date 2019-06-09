import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/server";
import {
  customer1,
  shipping_regions,
  shippings,
  wrongCustomer,
  signinInfo,
  wrongSigninInfo
} from "../seeders/seeders";

require("dotenv").config();

chai.should();

chai.use(chaiHttp);

describe('Tests for the Customer controllers', () => {

  before(done => {
    shipping_regions();
    done();
  });

  before(done => {
    shippings();
    done();
  });

  describe('Test for registering customer', () => {
    it('Bad input on signup test', (done) => {
      chai
        .request(server)
        .post('/signup')
        .set('Accept','application/json')
        .send(wrongCustomer)
        .end((err, res) => {
          const { status } = res.body;
          res.should.have.status(400);
          res.body.should.have.property("error");
          status.should.equal("error");
          done();
        });
    })

    it('Test for successful registration', (done) => {
      chai
        .request(server)
        .post('/customers')
        .set('Accept','application/json')
        .send(customer1)
        .end((err, res) => {
          const { status } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('customer');
          done();
        })
    })

    it('Existing customer signup test', (done) => {
      chai
        .request(server)
        .post('/customers')
        .set('Accept','application/json')
        .send(customer1)
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          res.body.should.have.property("error");
          status.should.equal("error");
          done();
        });
    })
  })

  describe('Customer Signin test', () => {
    it('Bad input on signin test', (done) => {
      chai
        .request(server)
        .post('/customers/login')
        .send(wrongSigninInfo)
        .set('Accept','application/json')
        .end((err, res) => {
          const { status } = res.body;
          res.should.have.status(400);
          res.body.should.have.property("error");
          status.should.equal("error");
          done();
        });
    })

    it('Test for successful signin', (done) => {
      chai
        .request(server)
        .post('/customers/login')
        .set('Accept','application/json')
        .send(signinInfo)
        .end((err, res) => {
          const { status } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('customer');
          done();
        })
    })
  })
})