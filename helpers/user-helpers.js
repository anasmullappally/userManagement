var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      const check = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (check) {
        reject();
      } else {
        userData.Password = await bcrypt.hash(userData.Password, 10);
        db.get()
          .collection(collection.USER_COLLECTION)
          .insertOne(userData)
          .then((data) => {
            resolve(data.insertedId);
          });
      }
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((status) => {
          if (status) {
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },
};
