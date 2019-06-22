import supertest from "supertest";
import {  UserHelper } from "./user-helper";
import { User1 } from "../models/user-collection";

describe("check for user", () => {
  it("should return false", async(done) => {
    const userHelp = new UserHelper();
    userHelp.findUser({ username: "shashankgpt27012" }).then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("should return user", async(done) => {
    const userHelp = new UserHelper();
    userHelp.findUser({ username: "shashankgpt2706" }).then(data => {
     // expect(data).toBeTruthy();
      expect(data).toBeInstanceOf(User1);
      done();
    });
  });
});

describe("get all user", () => {
  it("should return false", async(done) => {
    const userHelp = new UserHelper();
    userHelp.getAllUser().then(data => {
      expect(data).toBeInstanceOf(Array);
      done();
    });
  });
  it("should return user", async(done) => {
    const userHelp = new UserHelper();
    userHelp.getAllUser().then(data => {
      expect(data).toBeTruthy();
      done();
    });
  });
});
