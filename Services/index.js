var express = require("express");
const router = express.Router();
router.use("/login", require("./security/loginservice"));
router.use("/register", require("./security/registrationservice"));
router.use("/logout", require("./security/logoutservice"));
router.use("/newsletter", require("./security/newsletterservice"));
router.use("/popup", require("./security/popupservice"));
router.use("/iskconFamilyTestPage", require("./poc/testiframeservice"));
// Added By Vineet
router.use("/api", require("./sankirtan-app/api"));
//router.use('/register', require('./security/registerservice'));
// acess default page
router.get("/", function (objReq, objResMain) {
  // Login Get Request
  //objResMain.sendFile(__dirname + '/public/login.html');
  objResMain.send("No direct Access");
});
// Reserve Proxy to post data from member/ page to lvento page
router.all("/member/", function (request, response) {
//  console.log('inside i am')
  var strRedirectURL = request.body.hostname;
//  console.log('i m inside member')
  //strRedirectURL = "iskconfamily.elvanto.net";
  strRedirectURL = "iskcon.elvanto.net";
  // response.redirect(307,'https://vaisesikadasa.elvanto.net/login/');
  response.redirect(307, "https://" + strRedirectURL + "/login/");
});


module.exports = router;
