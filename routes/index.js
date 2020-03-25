var express = require('express');
var router = express.Router();

const loginRequired = require('../middlewares/loginRequired');
/* GET home page. *//*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.use('*', loginRequired);
// Default
router.get("/", function(req, res) {
  res.json({
    status: `Api is Running`,
    message: `Welcome to Lexical Density Calculator`,
    instructions: `please submit a post request with key userInput`
  });
});

// Import Controller
const apiController = require(`../controllers/lexicalController`);



// complexity routes
router
  .route("/complexity")
  .get(apiController.getLexicons)
  .post(apiController.calculateDensity);

router
  .route("/complexity/verbose")
  .post(apiController.Verbose);

  // Import Controller
const managerController = require(`../controllers/managerController`);


// Lexicon routes
router
  .route("/add/lexicon")
  .get(managerController.index)
  .post(managerController.new);

router
  .route("/Lexicon/:_id")
  .get(managerController.view)
  .delete(managerController.delete);


module.exports = router;
