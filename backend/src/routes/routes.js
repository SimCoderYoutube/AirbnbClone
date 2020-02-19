const router = require('express').Router();

const userFunc = require('../functions/user')
const postFunc = require('../functions/post')


/**
    * Endpoint responsible for calling the verifyAccount function
    * and sending back the response from it
*/
router.route('/api/user/check').post(function (req, res) {
    const { user } = req.query;
    userFunc.verifyAccount(user)
    .then(function (callback) {
        res.json(callback);
    }).catch(error => {
        res.json(error)
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
router.route('/api/post/create').post(function (req, res) {
    const { user, title, description, location, numberOfPeople, pricePerNight } = req.query;
    postFunc.createPost(user, title, description, location, numberOfPeople, pricePerNight)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
});


module.exports = router;


