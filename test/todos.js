const chai = require("chai");
const server = require("../server");
const chaiHttp = require("chai-http");

//Asertion style
chai.should();
chai.use(chaiHttp);

describe("Task API", () => {
  describe("GET /todos", () => {
    it("It should get all the task", done => {
      chai
        .request(server)
        .get("/todos")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(13);
          done();
        });
    });
    it("It should Not get all the task", done => {
      chai
        .request(server)
        .get("/todoss")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
  describe("GET /todos/id", () => {
    it("It should get a the task by id", done => {
      const todosId = 11;
      chai
        .request(server)
        .get(`/todos/${todosId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("description");
          response.body.should.have.property("id").eq(11);
          done();
        });
    });
    it("It should not get a the task by id", done => {
      const todosId = 111;
      chai
        .request(server)
        .get(`/todos/${todosId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq("the todo dont exist");
          done();
        });
    });
  });

  describe("POST /todos", () => {
    it("It should post a new task", done => {
      const todo = {
        description: "acheter du yassa et du bissap"
      };
      chai
        .request(server)
        .post("/todos")
        .send(todo)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(23);
          response.body.should.have
            .property("description")
            .eq("acheter du yassa et du bissap");
          done();
        });
    });
    it("It should Not post the task without property", done => {
      const todo = {
        description: "acheter du yassa et du bissap"
      };
      chai
        .request(server)
        .post("/todos")
        .send(todo)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq("pas reussis");
          done();
        });
    });
  });
});
