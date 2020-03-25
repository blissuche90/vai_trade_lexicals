
// import mongoose model
Lexicon = require(`../models/Lexicon`);
// Import Density calculator
getDensity = require(`./lexicalDensityCalc`);

// Get All Lexicons
exports.getLexicons = function(req, res) {
  Lexicon.find({}).then(lexicons => {
    let nonLexicons = lexicons.map(lx => lx.text);
    res.json({
      message: "All non lexical words",
      data: nonLexicons
    });
  });
};

exports.calculateDensity = function(req, res) {
  let { userInput } = req.body;
  if (!userInput) res.status(400).send({ error: "userInput Required." });
  Lexicon.find({}).then(lexicons => {
    let nonLexicons = lexicons.map(v => v.text);
    let overall_ld = getDensity(userInput, nonLexicons);
    res.json({
      data: { overall_ld }
    });
  });
};

exports.Verbose = function(req, res) {
  var overall_ld;
  var sentence_ld = [];
  let { userInput } = req.body;
  if (!userInput) res.status(400).send({ error: "No userInput Recieved." });
  uInput = userInput.match(/[^\.!\?]+[\.!\?]+/g);
  
  Lexicon.find({}).then(lexicons => {
    let nonLexicons = lexicons.map(lx => lx.text);

    // Call getDensity function.
    uInput.forEach(e => {
      sentence_ld.push(getDensity(e, nonLexicons));
    });

    // Calculate the average of Lexical Density
    overall_ld = sentence_ld.reduce((a,b)=> a+b, 0)/ sentence_ld.length;
   
    // Return data
    res.json({
      data: { sentence_ld, overall_ld }
    });
  });
};
