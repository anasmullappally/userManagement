var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");

const { ObjectId } = require("mongodb");
module.exports = {
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(collection.ADMIN_COLLECTION)
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
  addUser: (userData) => {
    return new Promise(async (resolve, reject) => {
      const checkuser = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (checkuser) {
        reject();
      } else {
        userData.Password = await bcrypt.hash(userData.Password, 10);
        db.get()
          .collection(collection.USER_COLLECTION)
          .insertOne(userData)
          .then((data) => {
            resolve(data);
          });
      }
    });
  },
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      let users = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .find()
        .toArray();
      resolve(users);
    });
  },
  deleteUser: (userid) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .deleteOne({ _id: ObjectId(userid) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getUserDetails: (userid) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: ObjectId(userid) })
        .then((user) => {
          resolve(user);
        });
    });
  },
  updateUser: (userid, userdetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: ObjectId(userid) },
          {
            $set: {
              name: userdetails.name,
              email: userdetails.email,
              Password: userdetails.Password,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
};
