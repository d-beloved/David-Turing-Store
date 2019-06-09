import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import {
    Attributes,
    AttributeValues,
    products
  } from '../seeders/seeders';

require('dotenv').config();

chai.should();

chai.use(chaiHttp);

describe('Tests for Attributes controller', () => {

  before((done) => {
    Attributes();
    done();
  });

  before((done) => {
    AttributeValues();
    done();
  });

  before((done) => {
    products();
    done();
  })

  describe('Get Attributes', () => {
    it('Should get all attributes in the db', (done) => {
      chai.request(server)
        .get('/attributes/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Get Attributes by ID', () => {
    it('Should return error if the id is not a number', (done) => {
      chai.request(server)
      .get('/attributes/a')
      .end((err, res) => {
        const { error, status } = res.body;
        res.should.have.status(400);
        status.should.equal('error');
        done();
      })
    })

    it('Should return error 400 if attribute is not found', (done) => {
      chai.request(server)
      .get('/attributes/7')
      .end((err, res) => {
        const { error, status } = res.body;
        res.should.have.status(400);
        error.body.should.be.a('object');
        status.should.equal('error');
        done();
      })
    })

    it('Should return 200 success when attribute is found', (done) => {
      chai.request(server)
      .get('/attributes/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
    })
  });

  describe('Get AttributesValues', () => {
    it('Should return error if the id is not a number', (done) => {
      chai.request(server)
      .get('/attributes/values/a')
      .end((err, res) => {
        const { error, status } = res.body;
        res.should.have.status(400);
        error.body.should.be.a('object');
        status.should.equal('error');
        done();
      })
    })

    it('Should return error 400 if attribute value is not found', (done) => {
      chai.request(server)
      .get('/attributes/values/7')
      .end((err, res) => {
        const { error, status } = res.body;
        res.should.have.status(400);
        error.body.should.be.a('object');
        status.should.equal('error');
        done();
      })
    })

    it('Should return 200 success when attribute value is found', (done) => {
      chai.request(server)
      .get('/attributes/values/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
    })
  })

  describe('Get Product Attributes', () => {
    it('Should return error if the productId is not a number', (done) => {
      chai.request(server)
      .get('/attributes/inProduct/a')
      .end((err, res) => {
        const { error, status } = res.body;
        res.should.have.status(403);
        error.body.should.be.a('object');
        status.should.equal('error');
        done();
      })
    })

    it('Should return error if the product is not found', (done) => {
      chai.request(server)
      .get('/attributes/inProduct/100')
      .end((err, res) => {
        const { error, status } = res.body;
        res.should.have.status(400);
        error.body.should.be.a('object');
        status.should.equal('error');
        done();
      })
    })

    it('Should return 200 success when the product is found', (done) => {
      chai.request(server)
      .get('/attributes/ofProduct/61/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
    })
  })
})
