import supertest from "supertest";
import app from "../src/app";
import {
    CREATED,
    PRECONDITIONFAILED,
    BADREQUEST,
} from "../src/config/util/response-code";
import { UserHelper } from "../src/app/helpers/user-helper";

describe("POST /public/register", () => {
  beforeAll((done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUsername("shashankhhg").then(data => {
      done();
    });
  });
  it("should return 201 OK", (done) => {
    supertest(app).post("/public/register").send({
      username: "shashankhhg",
      email: "shashankhhg34@gmail.com",
      password: "Anilgupta",
    })
            .expect(CREATED);
    done();
  });
  it("should return 412 PRECONDITIONFAILED", (done) => {
    supertest(app).post("/public/register").send({
      username: "shashankhhg",
      email: "shashankhhg34@gmail.com",
      password: "Anilgupta",
    })
            .expect(PRECONDITIONFAILED);
    done();
  });

  it("should return 400 BADREQUEST", (done) => {
    supertest(app).post("/public/register").send({
      password: "Anilgupta",
    })
            .expect(BADREQUEST);
    done();
  });
  afterAll(() => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUsername("shashankhhg").then(data => {
    });
  });
});
