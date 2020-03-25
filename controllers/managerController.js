
// Import model
Lexicon = require(`../models/Lexicon`);



// Handle index actions
exports.index = function(req, res) {
  Lexicon.find({}, "text", (err, lexicons) => {
    if (err) {
      console.log(err);
    }
    res.json({
      status: "success",
      message: "Words retrieved successfully",
      data: lexicons
    });
  });
};

// Add Lexicon
exports.new = (req, res) => {
  let lexicon = new Lexicon();
  word.text = req.body.text;

  // save the word and handle errors
  lexicon.save(err => {
    if (err) {
      res.json(err);
      console.log(err.message);
    } else {
      res.json({
        message: `New Word Added to DB`,
        data: lexicon
      });
    }
  });
};

// Find Lexicons
exports.view = (req, res) => {
  Lexicon.findById(req.params._id, (err, text) => {
    if (err) {
      res.json(err);
      console.log(err.message);
    } else {
      res.json({
        message: `Viewing one word by Id`,
        data: text
      });
    }
  });
};

// Delete Lexicon
exports.delete = (req, res) => {
  Lexicon.remove(
    {
      _id: req.body._id
    },
    (err, lexicon) => {
      if (err) {
        res.json(err);
        console.log(err.message);
      } else {
        res.json({
          status: "success",
          message: "deleted"
        });
      }
    }
  );
};
