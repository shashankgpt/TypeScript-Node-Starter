import supertest from "supertest";
import app from "../src/app";
import { FORBIDDEN,
  SUCCESSFUL,
  CREATED,
  PRECONDITIONFAILED,
  BADREQUEST, UNAUTHORIZED, NOTFOUND                   } from "../src/config/util/response-code";
import { IUser, IUserRegister } from "../src/app/data-types/interfaces";
import { UserHelper } from "../src/app/helpers/user-helper";

describe("GET /user/username/shashankgpt270", () => {
  it("should return 200 OK", () => {
    return supertest(app).get("/user/username/shashankgpt270")
    .set("Authorization", "bearer " + "2f35dc2a3e50a9454cab22cfeee07429")
    .expect(SUCCESSFUL);
  });
  it("should return 400 UNAUTHORIZED", () => {
    return supertest(app).get("/user/username/shashankgpt270").expect(UNAUTHORIZED);
  });
  it("should return 401 BADREQUEST", () => {
    return supertest(app).get("/user/username/sha")
    .set("Authorization", "bearer " + "2f35dc2a3e50a9454cab22cfeee07429")
    .expect(BADREQUEST);
  });

  it("should return 403 FORBIDDEN", () => {
    return supertest(app).get("/user/username/shasghajhgku")
    .set("Authorization", "bearer " + "2f35dc2a3e50a9454cab22cfeee07429")
    .expect(FORBIDDEN);
  });

});

describe("GET /user", () => {
  it("should return 200 OK", () => {
    return supertest(app).get("/user")
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(SUCCESSFUL);
  });

  it("should return 401 UNAUTHORIZED", () => {
    return supertest(app).get("/user")
    .expect(UNAUTHORIZED);
  });
});

describe("PATCH user/updatePassword", () => {
  it("should return 200 OK", () => {
    return supertest(app).patch("/user/updatePassword").send(
      {
        oldPassword : "Anilgupta",
        newPassword: "Anilgupta",
      },
    )
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(SUCCESSFUL);
  });

  it("should return 400 BADREQUEST", () => {
    return supertest(app).patch("/user/updatePassword").send(
      {
        oldPassword : "Anilgupta",
      },
    )
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(BADREQUEST);
  });

  it("should return 403 FORBIDDEN", () => {
    return supertest(app).patch("/user/updatePassword").send(
      {
        oldPassword : "Anilgupta2",
        newPassword: "Anilgupta",
      },
    )
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(FORBIDDEN);
  });

  it("should return 401 UNAUTHORIZED", () => {
    return supertest(app).patch("/user/updatePassword")
    .expect(UNAUTHORIZED);
  });
});

describe("PUT user/shashankgpt270", () => {
  it("should return 200 OK", () => {
    const user: IUser = {
      email : "shashankgpt270@gmail.com",
      firstName: "shashank",
      gender: "male",
      location: "ghaziabad",
      website: "ggg.com",
      lastName: "gupta",
    };
    return supertest(app).put("/user/shashankgpt270").send(user)
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(SUCCESSFUL);
  });
  it("should return 401 UNAUTHORIZED", () => {
    const user: IUser = {
      email : "shashankgpt270@gmail.com",
      firstName: "shashank",
      gender: "male",
      location: "ghaziabad",
      website: "ggg.com",
      lastName: "gupta",
    };
    return supertest(app).put("/user/shashankgpt270").send(user)
    .expect(UNAUTHORIZED);
  });

  it("should return 400 BADREQUEST", () => {
    const user: IUser = {
      email : "shashankgpt270@gmail.com",
      firstName: "shashank",
      gender: "male",
      location: undefined,
      website: undefined,
      lastName: undefined,
    };
    return supertest(app).put("/user/shashankgpt270").send(user)
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(BADREQUEST);
  });

  it("should return 403 FORBIDDEN", () => {
    const user: IUser = {
      email : "shashankgpt270@gmail.com",
      firstName: "shashank",
      gender: "male",
      location: "ghaziabad",
      website: "ggg.com",
      lastName: "gupta",
    };
    return supertest(app).put("/user/shashankgpt270i").send(user)
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(FORBIDDEN);
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

  it("should return 200 OK", () => {
    return supertest(app).delete("/user/shashanjiooi4")
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(SUCCESSFUL);
  });

  it("should return 401 UNAUTHORIZED", () => {
    return supertest(app).delete("/user/shashanjiooi4")
    .expect(UNAUTHORIZED);
  });

  it("should return 403 FORBIDDEN", () => {
    return supertest(app).delete("/user/shashanjiooi7")
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(FORBIDDEN);
  });

  it("should return 400 BADREQUEST", () => {
    return supertest(app).delete("/user/sha")
    .set("Authorization", "bearer " + "a3e11382012070132400affbb2abdaf4")
    .expect(BADREQUEST);
  });

});
