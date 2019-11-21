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


    /**
     * Endpoint responsible for calling the createPost function
     * and sending back the response from it
     * 
     * @param user - user object
     * @param title - title of the post
     * @param description - description of the post
     * @param location - location of the post
     * @param numberOfPeople - numberOfPeople of the post
     * @param pricePerNight - pricePerNight of the post
     */
    app.post('/api/post/create', (req, res, next) => {
        const { user, title, description, location, numberOfPeople, pricePerNight } = req.query;
        postFunc.createPost(user, title, description, location, numberOfPeople, pricePerNight)
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                res.json(error);
            })
    });
}

