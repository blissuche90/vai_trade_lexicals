const mongoose = require('mongoose');
const Lexicon = require('../models/Lexicon');
const nonLexicalWords = require('./nonLexicalWords')
const config = require("../config");

console.log(config.MONGODB_URI)
const dbName = config.MONGODB_URI;
mongoose.connect(dbName,{ useNewUrlParser: true });


let lexicons=[];

nonLexicalWords.forEach(text =>{
  lexicons.push({"text": text })
})

 console.log(lexicons)


Lexicon.create(lexicons, (err) => {
  if (err) { throw(err) }
  console.log(`Created lexicon`)
  mongoose.connection.close()
});