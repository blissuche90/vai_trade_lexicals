var express = require('express');
var router = express.Router();

/* GET home page. *//*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
// Default
router.get("/", function(req, res) {
  res.json({
    status: `Api is OK`,
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


// Word routes
router
  .route("/add/lexicon")
  .get(managerController.index)
  .post(managerController.new);

router
  .route("/Lexicon/:_id")
  .get(managerController.view)
  .delete(managerController.delete);


module.exports = router;
