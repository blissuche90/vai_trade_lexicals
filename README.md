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
Route / users/signup user signup
- input: {
    "fullname":"xxxxxx",
        "phone":"xxxxxx",
        "email":"xxxxxx",
        "password":"xxxxxx",
        "username":"xxxxxx"
}

Route / users/signin user signup
- input: {
        "email":"xxxxxx",
        "password":"xxxxxx"
}
All other Routes must have attributes

Header

Authorization: bearer {token}

Route / complexity calculates complexity of a string

- input: {
    "userInput": "Kim loves going to the cinema"
}
- output: {"data": {
    overall_ld: 0.67
    }
    }

Route /complexity?mode=verbose returns multiple sentances and an overall lexical density:
- output: {
    data: {
        sentance_ld: [0.23, 0.1, 1.0, 0.0],
        overall_ld: 0.42
    }
}


Route /add/lexicon/ Adds new words to Dictionary:
-input:{
    "text": "Bliss"
}

- output: {
   {
    "message": "New Word Added",
    "data": {
        "_id": "5e7b3dacc30ad1794ca354a0",
        "date": "2020-03-25T11:17:00.392Z",
        "text": "Bliss",
        "__v": 0
    }
   }
 }


ERRORS: 100 words maximum or 1000 characters are valid inputs

