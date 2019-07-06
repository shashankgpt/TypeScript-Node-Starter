import supertest from "supertest";
import app from "../src/app";
import { FORBIDDEN,
  SUCCESSFUL,
  CREATED,
  PRECONDITIONFAILED,
  BADREQUEST, UNAUTHORIZED, NOTFOUND                   } from "../src/config/util/response-code";
import { IUser, IUserRegister } from "../src/app/data-types/interfaces";
import { UserHelper } from "../src/app/helpers/user-helper";

describe("POST /public/register", () => {
  beforeAll(() => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUsername("shashankhhg").then(data => {
    });
  });
  it("should return 201 OK", () => {
    return supertest(app).post("/public/register").send({
      username: "shashankhhg",
      email: "shashankhhg34@gmail.com",
      password: "Anilgupta",
    })
      .set("Authorization", "bearer " + "e1daee0f076c58cd64b89ccb9a8461d1")
      .expect(CREATED);
  });
  it("should return 412 PRECONDITIONFAILED", () => {
    return supertest(app).post("/public/register").send({
      username: "shashankgpt270",
      email: "shashankgpt270@gmail.com",
      password: "Anilgupta",
    })
      .set("Authorization", "bearer " + "e1daee0f076c58cd64b89ccb9a8461d1")
      .expect(PRECONDITIONFAILED);
  });

  it("should return 400 BADREQUEST", () => {
    return supertest(app).post("/public/register").send({
      password: "Anilgupta",
    })
      .set("Authorization", "bearer " + "e1daee0f076c58cd64b89ccb9a8461d1")
      .expect(BADREQUEST);
  });
});
