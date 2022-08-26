var express = require("express");
var router = express.Router();

const userHelpers = require("../helpers/user-helpers");

userLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};
/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect("/home");
  } else {
    res.render("user/login", { loginErr: req.session.loginErr });
    req.session.loginErr = false;
  }
});
router.get("/home", userLogin, (req, res) => {
  let user = req.session.user;
  let products = [
    {
      name: "VALORANT",
      category: "Action",
      description:
        "A 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.Play free",
      image:
        "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-160cacc798ef1693cc0a339e869f1761",
    },
    {
      name: "GTA V",
      category: "Action,Adventure",
      description:
        "Create your own family and play however you want. Register and start playing. GTA Grand RP",
      image:
        "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg",
    },
    {
      name: "MINECRAFT",
      category: "Sandbox, survival",
      description:
        " Players create and break apart various kinds of blocks in three-dimensional worlds.play free",
      image:
        "https://cdn.vox-cdn.com/thumbor/2D0fSxmi24Zw7aaB3M_TViUavrc=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15957232/0fe20042_0bb8_4781_82f4_7130f928b021.jpg",
    },
    {
      name: "Assassin's Creed",
      category: "Action adventure game science fiction video game",
      description:
        "Create your own family and play however you want. Register and start playing. GTA Grand RP",
      image:
        "https://cdn2.unrealengine.com/ac2-gamename-store-landscape-2560x1440-2560x1440-aa944fa0e8c6.jpg",
    },
    {
      name: "CALL OF DUTY",
      category: "First-person shooter",
      description:
        "Call of Duty, electronic game that brought new advances to the first-person shooter genre",
      image:
        "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/kronos/common/social-share/social-share-image.jpg",
    },
    {
      name: "PUBG",
      category: "Battle Royale",
      description:
        "Player versus player shooter game in which up to one hundred players fight in a battle royale, ",
      image:
        "https://www.aroged.com/wp-content/uploads/2021/12/PUBG-Battlegrounds-Free-to-Play-Modell-ab-Januar.png",
    },
    {
      name: "NFS",
      category: "Racing video game",
      description:
        "Let's do need for speed most wanted. It's a racing game where your goal is to get to #1 on the wanted list.",
      image:
        "https://staticg.sportskeeda.com/editor/2020/12/ed6f5-16069157093599-800.jpg",
    },
    {
      name: "FIFA",
      category: "Racing video game",
      description:
        "Its responsible for the organization of association football's major international tournaments.",
      image:
        "https://staticg.sportskeeda.com/editor/2020/06/a43d4-15928015256443-800.jpg",
    },
  ];
  res.render("index", { products, user });
});
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
  } else {
    res.render("user/signup", { alreadyexist: req.session.alreadyexist });
  }
});
router.post("/sign-up", (req, res) => {
  userHelpers
    .doSignup(req.body)
    .then((response) => {
      res.redirect("/");
    })
    .catch(() => {
      req.session.alreadyexist = true;
      res.redirect("/signup");
    });
});
router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/home");
    } else {
      req.session.loginErr = "Invalid username or password";
      res.redirect("/");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.loggedIn = false;
  res.redirect("/");
});

module.exports = router;
