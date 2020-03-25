var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  res.json({
    status: `Api is Running`,
    message: `Welcome to Lexical Density Calculator`,
    instructions: `please submit a post request with key userInput`
  });
});

const User = require(`../controllers/userController`);

const loginRequired = require('../middlewares/loginRequired');

router.post('/signup', User.signUp);
router.post('/signin', User.signIn);
router.post('/social', User.socialSignIn);


router.route('/edit').patch(loginRequired, User.editUser);

router.post(
  '/reset-password',
  User.recoverPassword
);
router.patch(
  '/reset-password/:token',
  User.resetPassword
);

module.exports = router;
