// Mongoose model Schema for non lexical words

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const LexiconSchema = new Schema({
    text: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Lexicon", LexiconSchema)

