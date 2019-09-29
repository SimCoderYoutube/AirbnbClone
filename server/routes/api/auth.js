const userModel = require('../../models/user')

var admin = require('firebase-admin')
const serviceAccount = require('../../config/airbnb-850aa-firebase-adminsdk-41pp1-a898690c5c.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'airbnb-850aa.firebaseio.com'
})

module.exports = (app) => {
    /**
     * Endpoint responsible for calling the verifyAccount function
     * and sending back the response from it
     */
    app.post('/api/auth/verifyUser', (req, res, next) =>{
        console.log("/api/auth/verifyUser is being called");
        verifyAccount(req, function(callback){
            return res.send(callback);
        })
    })
}

/**
 * Checks wether or not the token of the user is valid,
 * if it is then it means the user is properly logged in.
 */
verifyAccount = (req, callback) => {
    const {query} = req
    const {user} = query

    userJson = JSON.parse(user);

    console.log("______________");
    console.log(userJson);
    console.log("______________");
    console.log("verifying user");
    
    admin.auth().verifyIdToken(userJson.stsTokenManager.accessToken).then(function(decodedToken){
        console.log("user verified");
    }).catch(function(error){
        console.log(error)
    })

}