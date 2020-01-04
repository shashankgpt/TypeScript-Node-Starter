import supertest from "supertest";
import app from "../src/app";
import {
    FORBIDDEN,
    SUCCESSFUL,
    CREATED,
    PRECONDITIONFAILED,
    BADREQUEST, UNAUTHORIZED, NOTFOUND
} from "../src/config/util/response-code";
import { IUser, IUserRegister } from "../src/app/data-types/interfaces";
import { UserHelper } from "../src/app/helpers/user-helper";
import promiseErrorHandler from "../src/app/middlewares/promise.error-handler";
const usernameCheck = "shashankhhg";
const passwordCheck = "Anilgupta";
let token = "aecbd5f68e005ae90f31d62978043bbe";
describe("GET /user/username/shashankgpt270", () => {
    beforeAll(async (done) => {
        const res = await supertest(app).post("/public/register").send({
            username: usernameCheck,
            email: "shashankhhg34@gmail.com",
            password: passwordCheck,
        });
        const auth = Buffer.from(usernameCheck + ":" + passwordCheck).toString("base64");
        const res2 = await supertest(app).post("/public/login").send({})
            .set("Authorization", "Basic " + auth);
        token = res2.body.data.token;
        done();
    });
    it("should return 200 OK", (done) => {
        supertest(app).get("/user/shashankhhg")
            .set("Authorization", "bearer " + token)
            .expect(SUCCESSFUL);
        done();
    });
    it("should return 400 UNAUTHORIZED", () => {
        return supertest(app).get("/user/shashankhhg").expect(UNAUTHORIZED);
    });
    it("should return 401 BADREQUEST", (done) => {
        supertest(app).get("/user/sha")
            .set("Authorization", "bearer " + token)
            .expect(BADREQUEST);
        done();
    });

    it("should return 403 FORBIDDEN", (done) => {
        supertest(app).get("/user/shasghajhgku")
            .set("Authorization", "bearer " + token)
            .expect(FORBIDDEN);
        done();
    });

});

describe("GET /user", () => {
    it("should return 200 OK", (done) => {
        supertest(app).get("/user")
            .set("Authorization", "bearer " + token)
            .expect(SUCCESSFUL);
        done();
    });

    it("should return 401 UNAUTHORIZED", () => {
        return supertest(app).get("/user")
            .expect(UNAUTHORIZED);
    });
});

describe("PATCH user/updatePassword", () => {
    it("should return 200 OK", (done) => {
        supertest(app).patch("/user/updatePassword").send(
            {
                oldPassword: "Anilgupta",
                newPassword: "Anilgupta",
            },
        )
            .set("Authorization", "bearer " + token)
            .expect(SUCCESSFUL);
        done();
    });

    it("should return 400 BADREQUEST", (done) => {
        supertest(app).patch("/user/updatePassword").send(
            {
                oldPassword: "Anilgupta",
            },
        )
            .set("Authorization", "bearer " + token)
            .expect(BADREQUEST);
        done();
    });

    it("should return 403 FORBIDDEN", (done) => {
      supertest(app).patch("/user/updatePassword").send(
            {
                oldPassword: "Anilgupta2",
                newPassword: "Anilgupta",
            },
        )
            .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
            .expect(FORBIDDEN);
        done();
    });

  it("should return 401 UNAUTHORIZED", () => {
      return supertest(app).patch("/user/updatePassword")
            .expect(UNAUTHORIZED);
    });
});

describe(`PUT user/${usernameCheck}`, () => {
  it("should return 200 OK", (done) => {
      const user: IUser = {
          email: "shashankgpt270@gmail.com",
          firstName: "shashank",
          gender: "male",
          location: "ghaziabad",
          website: "ggg.com",
          lastName: "gupta",
        };
      supertest(app).put(`user/${usernameCheck}`).send(user)
            .set("Authorization", "bearer " + token)
            .expect(SUCCESSFUL);
      done();
    });
  it("should return 401 UNAUTHORIZED", () => {
    const user: IUser = {
      email: "shashankgpt270@gmail.com",
      firstName: "shashank",
      gender: "male",
      location: "ghaziabad",
      website: "ggg.com",
      lastName: "gupta",
    };
    return supertest(app).put("/user/shashankgpt270").send(user)
            .expect(UNAUTHORIZED);
  });

  it("should return 400 BADREQUEST", (done) => {
    const user: IUser = {
      email: "shashankgpt270@gmail.com",
      firstName: "shashank",
      gender: "male",
      location: undefined,
      website: undefined,
      lastName: undefined,
    };
    supertest(app).put(`user/${usernameCheck}`).send(user)
            .set("Authorization", "bearer " + token)
            .expect(BADREQUEST);
    done();
  });

  it("should return 403 FORBIDDEN", (done) => {
    const user: IUser = {
      email: "shashankgpt270@gmail.com",
      firstName: "shashank",
      gender: "male",
      location: "ghaziabad",
      website: "ggg.com",
      lastName: "gupta",
    };
    supertest(app).put("/user/shashankgpt270i").send(user)
            .set("Authorization", "bearer " + token)
            .expect(FORBIDDEN);
    done();
  });

});

describe("DELETE user/shashankgpt270", () => {
  beforeAll(() => {
    const userHelp = new UserHelper();
    const User: IUserRegister = {
      username: "shashanjiooi4",
      email: "shashanjiooi@gmail4.com",
      password: "shashanjiooi@gmail4.com",
    };
    userHelp.createUser(User).then(data => {
    });
  });

  it("should return 200 OK", (done) => {
    supertest(app).delete("/user/shashanjiooi4")
            .set("Authorization", "bearer " + token)
            .expect(SUCCESSFUL);
    done();
  });

  it("should return 401 UNAUTHORIZED", (done) => {
    supertest(app).delete("/user/shashanjiooi4")
            .expect(UNAUTHORIZED);
    done();
  });

  it("should return 403 FORBIDDEN", (done) => {
    supertest(app).delete("/user/shashanjiooi7")
            .set("Authorization", "bearer " + token)
            .expect(FORBIDDEN);
    done();
  });

  it("should return 400 BADREQUEST", (done) => {
    supertest(app).delete("/user/sha")
            .set("Authorization", "bearer " + token)
            .expect(BADREQUEST);
    done();
  });

});
