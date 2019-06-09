import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/server";
import { Categories, departments } from "../seeders/seeders";

require("dotenv").config();

chai.should();

chai.use(chaiHttp);

describe("Tests for category controller", () => {
  before(done => {
    Categories();
    done();
  });

  before(done => {
    departments();
    done();
  });

  describe("Get all categories", () => {
    it("should return all categories", done => {
      chai
        .request(server)
        .get("/categories/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("Get category by Id", () => {
    it("should return error message when the id is not a number", done => {
      chai
        .request(server)
        .get("/categories/a")
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(403);
          error.body.should.be.a('object');
          status.should.equal("error");
          done();
        });
    });

    it("Should return error 400 if category is not found", done => {
      chai
        .request(server)
        .get("/categories/1")
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.body.should.be.a('object');
          status.should.equal("error");
          done();
        });
    });

    it("Should return 200 success when category is found", done => {
      chai
        .request(server)
        .get("/categories/7")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe('Get category by department', () => {
    it("should return error message when the id is not a number", done => {
      chai
        .request(server)
        .get("/categories/inDepartment/a")
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.body.should.be.a('object');
          status.should.equal("error");
          done();
        });
    });

    it("Should return error 400 if category in the department is not found", done => {
      chai
        .request(server)
        .get("/categories/inDepartment/5")
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.body.should.be.a('object');
          status.should.equal("error");
          done();
        });
    });

    it("Should return 200 success when category in the department is found", done => {
      chai
        .request(server)
        .get("/categories/inDepartment/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  })
});
