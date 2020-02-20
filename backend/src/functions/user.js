var admin = require('firebase-admin');

var serviceAccount = require("../config/config.js").serviceAccount;
var databaseURL = require("../config/config.js").databaseURL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

const userModel = require('../models/user');

module.exports = {
  verifyAccount: function (user) {
    return new Promise(function (resolve, reject) {
      if(user === undefined){
        return reject({
          code: 401,
          success: false,
          message: "auth denied"
        });
      }
      //Place the user info that reached this point in a string into an object
      userJson = JSON.parse(user);

      console.log(userJson)
      console.log(userJson.stsTokenManager)
      //Check if the user token is valid, this will confirm the user is correctly logged in
      admin.auth().verifyIdToken(userJson.stsTokenManager.accessToken)
        .then(function (decodedToken) {
          userModel.findOne({ googleId: userJson.uid }).then(function (user) {

            //Check if user exists
            if (!user) {
              
            //Create user and save it to the databse
              new userModel({
                name: userJson.displayName,
                picture: userJson.photoURL,
                email: userJson.email,
                googleId: userJson.uid
              }).save().then(function(error, user){
                resolve({
                  code: 200,
                  success: true,
                  message: "auth confirmed: new user created",
                  user: user
                })
              })
            } else {
              resolve({
                code: 200,
                success: true,
                message: "auth confirmed: existing user",
                user: user
              })
            }
          })
        }).catch(function (error) {
          reject({
            code: 401,
            success: false,
            message: "auth denied",
            error: error
          })
        });
    });
  }
};
