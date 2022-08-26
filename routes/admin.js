var express = require("express");
const req = require("express/lib/request");
var router = express.Router();
var adminHelper = require("../helpers/admin-helpers");
const userHelpers = require("../helpers/user-helpers");
var objectId = require("mongodb").ObjectId;

/* GET users listing. */
router.get("/", (req, res) => {
  if (req.session.login) {
    res.redirect("/admin/view-user");
  } else {
    res.render("admin/admin-login", { loginerror: req.session.loginerror });
    req.session.loginerror = false;
  }
});

router.post("/viewuser", (req, res) => {
  res.header(
    "cache-control",
    "no-cache,private,no-store,must-revalidate,max-stale=0,post,check=0,pre-check=0"
  );
  adminHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.login = true;
      res.redirect("/admin/view-user");
    } else {
      req.session.loginerror = true;
      res.redirect("/admin");
    }
  });
});

router.get("/view-user", function (req, res, next) {
  if (req.session.login) {
    adminHelper.getAllUsers().then((users) => {
      res.render("admin/view-users", { admin: true, users });
    });
  } else {
    res.redirect("/admin");
  }
});

router.get("/add-user", function (req, res) {
  if (req.session.login) {
    res.render("admin/add-user", {
      admin: true,
      Alreadyexist: req.session.Alreadyexist,
    });
    req.session.Alreadyexist = false;
  } else {
    res.redirect("/admin");
  }
});
router.post("/adduser", (req, res) => {
  adminHelper
    .addUser(req.body)
    .then((result) => {
      res.redirect("/admin/view-user");
    })
    .catch(() => {
      req.session.Alreadyexist = true;
      res.redirect("/admin/add-user");
    });
});
router.get("/delete-user/:id", (req, res) => {
  let userid = req.params.id;
  adminHelper.deleteUser(userid).then((response) => {
    res.redirect("/admin/view-user");
  });
});
router.get("/edit-user/:id", async (req, res) => {
  let user = await adminHelper.getUserDetails(req.params.id);
  if (req.session.login) {
    res.render("admin/edit-user", { user, admin: true });
  } else {
    res.redirect("/admin");
  }
});
router.post("/edit-user/:id", (req, res) => {
  adminHelper.updateUser(req.params.id, req.body).then(() => {
    res.redirect("/admin");
  });
});
router.get("/logout", (req, res) => {
  req.session.login = false;
  res.redirect("/admin");
});

module.exports = router;
