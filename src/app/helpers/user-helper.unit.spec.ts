import supertest from "supertest";
import {  UserHelper } from "./user-helper";
import { User1 } from "../models/user-collection";
import { resolve, reject } from "bluebird";
import { IUserRegister } from "../data-types/interfaces";
import { error } from "shelljs";
import { ObjectID, ObjectId } from "bson";

describe("check for getAllUser function", () => {
  it("get All user with fake Promise with false to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.getAllUser = jest.fn(() => Promise.resolve(false));
    userHelp.getAllUser().then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("real get All user", (done) => {
    const userHelp = new UserHelper();
    userHelp.getAllUser().then(data => {
      expect(data).toBeTruthy();
      expect(data).toBeInstanceOf(Array);
      done();
    });
  });
});

describe("check for unlockUser", () => {
  it("unLockUser with fake Promise with false in unLockUser to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.unLockUser = jest.fn(() => Promise.resolve(false));
    userHelp.unLockUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("unLockUser with fake Promise with false in update to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.update = jest.fn(() => Promise.resolve(false));
    userHelp.unLockUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("unLockUser real for wrong user", (done) => {
    const userHelp = new UserHelper();
    userHelp.unLockUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("unLockUser real", (done) => {
    const userHelp = new UserHelper();
    userHelp.unLockUser("shashankgpt2706").then(data => {
      expect(data).toBe(true);
      done();
    });
  });
});

describe("check for lockUser", () => {
  it("LockUser with fake Promise with false in unLockUser to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.lockUser = jest.fn(() => Promise.resolve(false));
    userHelp.lockUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("LockUser with fake Promise with false in update to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.update = jest.fn(() => Promise.resolve(false));
    userHelp.lockUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("LockUser real for wrong user", (done) => {
    const userHelp = new UserHelper();
    userHelp.lockUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("LockUser real", (done) => {
    const userHelp = new UserHelper();
    userHelp.lockUser("shashankgpt2706").then(data => {
      expect(data).toBe(true);
      done();
    });
  });
});

describe("check for activateUser to verify time", () => {
  it("activateUser with fake Promise with false in activateUser", (done) => {
    const userHelp = new UserHelper();
    userHelp.activeUser = jest.fn(() => Promise.resolve(false));
    userHelp.activeUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("activateUser with fake Promise with false in update to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.update = jest.fn(() => Promise.resolve(false));
    userHelp.activeUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("activateUser real for wrong user", (done) => {
    const userHelp = new UserHelper();
    userHelp.activeUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("activateUser real", (done) => {
    const userHelp = new UserHelper();
    userHelp.activeUser("shashankgpt2706").then(data => {
      expect(data).toBe(true);
      done();
    });
  });
});

describe("check for createUser", () => {
  it("check for create User with fake Promise to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.createUser = jest.fn(() => Promise.resolve(false));
    const User: IUserRegister = {
      username: "shashanjiooi",
      email: "shashanjiooi@gmail.com",
      password: "shashanjiooi@gmail.com",
    };
    userHelp.createUser(User).then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it.skip("create user real", (done) => {
    const userHelp = new UserHelper();
    const User: IUserRegister = {
      username: "shashanjiooi3",
      email: "shashanjiooi@gmail3.com",
      password: "shashanjiooi@gmail3.com",
    };
    userHelp.createUser(User).then(data => {
      expect(data).toBeTruthy();
      done();
    });
  });
  // error handling for mongodb
  it.skip("create user real", (done) => {
    const userHelp = new UserHelper();
    const User: IUserRegister = {
      username: "shashanjiooi4",
      email: "shashanjiooi@gmail4.com",
      password: "shashanjiooi@gmail4.com",
    };
    userHelp.createUser(User).then(data => {
      expect(data).toBeInstanceOf(error);
      done();
    });
  });
  it.skip("create user real", (done) => {
    const userHelp = new UserHelper();
    const User: IUserRegister = {
      username: "shashanjiooi4",
      email: "shashanjiooi@gmail4.com",
      password: "shashanjiooi@gmail4.com",
    };
    userHelp.createUser(User).then(data => {
      expect(data).toBeInstanceOf(error);
      done();
    });
  });
});

describe("check for activateUser", () => {
  it("activateUser with fake Promise with false in activateUser to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.activeUser = jest.fn(() => Promise.resolve(false));
    userHelp.activeUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("activateUser with fake Promise with false in update  to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.update = jest.fn(() => Promise.resolve(false));
    userHelp.activeUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("activateUser real for wrong user", (done) => {
    const userHelp = new UserHelper();
    userHelp.activeUser("shashankgpt27012").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("activateUser real", (done) => {
    const userHelp = new UserHelper();
    userHelp.activeUser("shashankgpt2706").then(data => {
      expect(data).toBe(true);
      done();
    });
  });
});

describe("check for updateEmail", () => {
  it("updateEmail with fake Promise with false in updateEmail to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.updateEmail = jest.fn(() => Promise.resolve(false));
    userHelp
    .updateEmail(new ObjectId("507f1f77bcf86cd799439011"),
                 "shashanjiooi@gmail3.com").then(data => {
                   expect(data).toBe(false);
                   done();
                 });
  });
  it("updateEmail with fake Promise with false in update  to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.update = jest.fn(() => Promise.resolve(false));
    userHelp
    .updateEmail(new ObjectId("507f1f77bcf86cd799439011"),
                 "shashanjiooi@gmail3.com").then(data => {
                   expect(data).toBe(false);
                   done();
                 });
  });
  it("updateEmail real", (done) => {
    const userHelp = new UserHelper();
    userHelp
    .updateEmail(new ObjectId("507f1f77bcf86cd799439011"),
                 "shashanjiooi@gmail3.com").then(data => {
                   expect(data).toBe(false);
                   done();
                 });
  });
  it.skip("updateEmail real", (done) => {
    const userHelp = new UserHelper();
    userHelp
    .updateEmail(new ObjectId("507f1f77bcf86cd799439011"),
                 "shashanjiooi@gmail3.com").then(data => {
                   expect(data).toBe(true);
                   done();
                 });
  });
});

describe("check for updateProfileByUserID/updateProfileByUsername", () => {
  it(`updateProfileByUserID with fake Promise with false in updateProfileByUserID to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.updateProfileByUserID = jest.fn(() => Promise.resolve(false));
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUserID(new ObjectId("507f1f77bcf86cd799439011"),
                           User).then(data => {
                             expect(data).toBe(false);
                             done();
                           });
     });

  it(`updateProfileByUsername with fake Promise with false in
  updateProfileByUsername to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.updateProfileByUsername = jest.fn(() => Promise.resolve(false));
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUsername("shashanjiooi",
                             User).then(data => {
                               expect(data).toBe(false);
                               done();
                             });
     });
  it(`updateProfileByUserID with fake Promise with false in update to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.update = jest.fn(() => Promise.resolve(false));
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUserID(new ObjectId("507f1f77bcf86cd799439011"),
                           User).then(data => {
                             expect(data).toBe(false);
                             done();
                           });
     });

  it(`updateProfileByUsername with fake Promise with false in
  update to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.update = jest.fn(() => Promise.resolve(false));
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUsername("shashanjiooi",
                             User).then(data => {
                               expect(data).toBe(false);
                               done();
                             });
     });
  it("updateProfileByUserID real -false",
     (done) => {
       const userHelp = new UserHelper();
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUserID(new ObjectId("507f1f77bcf86cd799439011"),
                           User).then(data => {
                             expect(data).toBe(false);
                             done();
                           });
     });

  it("updateProfileByUsername real -false",
     (done) => {
       const userHelp = new UserHelper();
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUsername("shashanjiooi",
                             User).then(data => {
                               expect(data).toBe(false);
                               done();
                             });
     });
  it("updateProfileByUserID real -true",
     (done) => {
       const userHelp = new UserHelper();
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUserID(new ObjectId("507f1f77bcf86cd799439011"),
                           User).then(data => {
                             expect(data).toBe(false);
                             done();
                           });
     });

  it("updateProfileByUsername real -true",
     (done) => {
       const userHelp = new UserHelper();
       const User: any = {
         email: "shashanjiooi@gmail3.com",
         profile: {
           firstName: "shashanjiooi",
           lastName: "shashanjiooi",
           gender: "Male",
         },
       };
       userHelp
    .updateProfileByUsername("shashanjiooi",
                             User).then(data => {
                               expect(data).toBe(false);
                               done();
                             });
     });
});

describe("check for findUserByEmail/findUserByUserID/findUserByUsername", () => {
  it(`findUserByEmail with fake Promise with false in findUserByEmail to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.findUserByEmail = jest.fn(() => Promise.resolve(false));
       userHelp
    .findUserByEmail("shashanjiooi@gmail3.com").then(data => {
      expect(data).toBe(false);
      done();
    });
     });

  it(`findUserByUserID with fake Promise with false in findUserByUserID to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.findUserByUserID = jest.fn(() => Promise.resolve(false));
       userHelp
    .findUserByUserID(new ObjectId("507f1f77bcf86cd799439011")).then(data => {
      expect(data).toBe(false);
      done();
    });
     });
  it(`findUserByUsername with fake Promise with false in findUserByUsername to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.findUserByUsername = jest.fn(() => Promise.resolve(false));
       userHelp
    .findUserByUsername("shashanjiooi3").then(data => {
      expect(data).toBe(false);
      done();
    });
     });
  it(`findUserByEmail with fake Promise with false in findUserByEmail to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.findUser = jest.fn(() => Promise.resolve(false));
       userHelp
    .findUserByEmail("shashanjiooi@gmail3.com").then(data => {
      expect(data).toBe(false);
      done();
    });
     });

  it(`findUserByUserID with fake Promise with false in findUserByUserID to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.findUser = jest.fn(() => Promise.resolve(false));
       userHelp
    .findUserByUserID(new ObjectId("507f1f77bcf86cd799439011")).then(data => {
      expect(data).toBe(false);
      done();
    });
     });
  it(`findUserByUsername with fake Promise with false in findUserByUsername to verify time`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp.findUser = jest.fn(() => Promise.resolve(false));
       userHelp
    .findUserByUsername("shashanjiooi@gmail3.com").then(data => {
      expect(data).toBe(false);
      done();
    });
     });
  it(`findUserByEmail real`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp
    .findUserByEmail("shashanjiooi@gmail7.com").then(data => {
      expect(data).toBe(false);
      done();
    });
     });

  it(`findUserByUserID real`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp
    .findUserByUserID(new ObjectId("507f1f77bcf86cd799439011")).then(data => {
      expect(data).toBe(false);
      done();
    });
     });

  it(`findUserByUsername real`,
     (done) => {
       const userHelp = new UserHelper();
       userHelp
     .findUserByUsername("shashanjiooi").then(data => {
       expect(data).toBe(false);
       done();
     });
     });

  it.skip(`findUserByUsername real - reject`,
          (done) => {
            const userHelp = new UserHelper();
            userHelp
     .findUserByUsername("shashanjiooi").then(data => {
       expect(data).toBe(true);
       done();
     });
          });

});

describe("check for updatePassword", () => {
  it("updatePassword with fake Promise with false in updatePassword to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.updatePassword = jest.fn(() => Promise.resolve(false));
    userHelp.updatePassword(new ObjectId("507f1f77bcf86cd799439011"),
                            "shashanjiooi@gmail3.com", "shashanjiooi@gmail4.com").then(data => {
                              expect(data).toBe(false);
                              done();
                            });
  });
  it("updatePassword with fake Promise with false in findUserByUserID  to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.findUserByUserID = jest.fn(() => Promise.resolve(false));
    userHelp.updatePassword(new ObjectId("507f1f77bcf86cd799439011"),
                            "shashanjiooi@gmail3.com", "shashanjiooi@gmail4.com").then(data => {
                              expect(data).toBe(false);
                              done();
                            });
  });
  it("updatePassword real for wrong user - false", (done) => {
    const userHelp = new UserHelper();
    userHelp.updatePassword(new ObjectId("507f1f77bcf86cd799439011"),
                            "shashanjiooi@gmail3.com", "shashanjiooi@gmail4.com").then(data => {
                              expect(data).toBe(false);
                              done();
                            });
  });
  it("updatePassword real", (done) => {
    const userHelp = new UserHelper();
    userHelp.updatePassword(new ObjectId("5d0e0e74b5fd5e5881d262c8"),
                            "shashanjiooi@gmail4.com", "shashanjiooi@gmail4.com").then(data => {
                              expect(data).toBe(true);
                              done();
                            });
  });
  it.skip("updatePassword real", (done) => {
    const userHelp = new UserHelper();
    userHelp.updatePassword(new ObjectId("5d0e0e74b5fd5e5881d262c8"),
                            "Anilgupta", "shashanjiooi@gmail4.com").then(data => {
                              expect(data).toBe(true);
                              done();
                            });
  });
});

describe("check for deleteUserByUsername/id", () => {
  it("deleteByUsername fake promise in deleteUserByUsername to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUsername = jest.fn(() => Promise.resolve(false));
    userHelp.deleteUserByUsername("shashanjiooi3").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("deleteUserByUserID fake promise in deleteUserByUserID to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUserID = jest.fn(() => Promise.resolve(false));
    userHelp.deleteUserByUserID(new ObjectId("507f1f77bcf86cd799439011")).then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("deleteByUsername fake promise in deleteUser to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUser = jest.fn(() => Promise.resolve(false));
    userHelp.deleteUserByUsername("shashanjiooi3").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it("deleteUserByUserID fake promise in deleteUser to verify time", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUser = jest.fn(() => Promise.resolve(false));
    userHelp.deleteUserByUserID(new ObjectId("507f1f77bcf86cd799439011")).then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it.skip("real deleteUsername", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUsername("shashanjiooi3").then(data => {
      expect(data).toBe(false);
      done();
    });
  });
  it.skip("real deleteUsername", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUsername("shashanjiooi3").then(data => {
      expect(data).toBe(true);
      done();
    });
  });
  it.skip("real deleteUserId", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUserID(new ObjectId("507f1f77bcf86cd799439011")).then(data => {
      expect(data).toBeInstanceOf(User1);
      done();
    });
  });
  it.skip("real deleteUserId", (done) => {
    const userHelp = new UserHelper();
    userHelp.deleteUserByUserID(new ObjectId("507f1f77bcf86cd799439011")).then(data => {
      expect(data).toBeInstanceOf(User1);
      done();
    });
  });
});
