import supertest from "supertest";
import app from "../src/app";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return supertest(app).get("/user").set("Authorization", "bearer " + "e1daee0f076c58cd64b89ccb9a8461d1");
  });
});
