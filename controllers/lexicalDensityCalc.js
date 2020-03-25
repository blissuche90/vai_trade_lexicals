
const getLexicalDensity = (str, nonLexicalArr) => {
  // Handle out of boounds values
  if (
    str.length > 1000 ||
    typeof str !== "string" ||
    !nonLexicalArr ||
    str.length < 1
  )
    return false;

  //  Make string an array of lower case letters and remove punctuations.
  let processInput = str
    .trim()
    .toLowerCase()
    .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ``)
    .split(" ")
    .filter(item => item !== "");

  if (processInput.length > 100) {
    return false;
  } else {
   
    const wordCount = processInput.length;

    // Filter processInput against list of non lexical words text.
    let result = processInput.filter(word => !nonLexicalArr.includes(word));
    let overall_ld = Number((result.length / wordCount).toFixed(2));
    return overall_ld;
  }
};

// getLexicalDensity("Kim loves going to the movies", wordList);

module.exports = getLexicalDensity;
