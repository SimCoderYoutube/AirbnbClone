const router = require('express').Router();

const userFunc = require('../functions/user')
const postFunc = require('../functions/post')


/**
    * Endpoint responsible for calling the verifyAccount function
    * and sending back the response from it
*/
router.route('/api/user/check').post(function (req, res) {
    const { user, idToken } = req.query;
    userFunc.verifyAccount(user, idToken)
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
    const { user, idToken, title, description, location, numberOfPeople, pricePerNight, downloadUrlList } = req.query;
    console.log(downloadUrlList)
    postFunc.createPost(user, idToken, title, description, location, numberOfPeople, pricePerNight, downloadUrlList)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
});


/**
 * Endpoint responsible for calling the listpost function
 * and sending back the response from it.
 * 
 * It will list all the posts available according to certain params
 */
router.route('/api/post/list').get(function (req, res) {
    console.log("asasdasd")
    postFunc.listPost()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
});


module.exports = router;


