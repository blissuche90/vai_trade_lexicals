# Lexical Density Api 


# To Use:
Requires: node and Local mongoDB

1. clone this repository
2. cd vai_trade_lexicals
3. npm install
4. With a local mongoDB instance running - $ npm run seed
5. npm start

6.  Make a post request to : http://localhost:3000/api/complexity/
with a body key "userInput" & a value of a single sentence.

- http://localhost:3000/api/complexity/verbose will handle paragraph inputs and seperate your userInput to sentences.



## Project Requirements: 
Route / complexity calculates complexity of a string
- output: {"data": {
    overall_ld: 0.42
    }
    }

Route /complexity?mode=verbose returns multiple sentances and an overall lexical density:
- output: {
    data: {
        sentance_ld: [0.23, 0.1, 1.0, 0.0],
        overall_ld: 0.42
    }
}

ERRORS: 100 words maximum or 1000 characters are valid inputs

