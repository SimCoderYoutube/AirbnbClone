const userFunc = require('../../functions/user')

module.exports = (app) => {
    /**
     * Endpoint responsible for calling the verifyAccount function
     * and sending back the response from it
     */
    app.post('/api/user/check', (req, res, next) =>{

        const {user} = req.query;
        userFunc.verifyAccount(user).then(function(callback){
            res.json(callback);
        });
    });
}

