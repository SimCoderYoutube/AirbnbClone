const userFunc = require('../../functions/user')
const postFunc = require('../../functions/post')

module.exports = (app) => {
    /**
     * Endpoint responsible for calling the verifyAccount function
     * and sending back the response from it
     */
    app.post('/api/user/check', (req, res, next) => {
        const { user } = req.query;
        userFunc.verifyAccount(user).then(function (callback) {
            res.json(callback);
        });
    });

    app.post('/api/post/create', (req, res, next) => {
        const { user, title, description, location, numberOfPeople, pricePerNight } = req.query;
        postFunc.createPost(user, title, description, location, numberOfPeople, pricePerNight)
            .then(result => {
                console.log(result)
                res.json(result);
            })
            .catch(error => {
                console.log(error)
                res.json(error);
            })
    });
}

