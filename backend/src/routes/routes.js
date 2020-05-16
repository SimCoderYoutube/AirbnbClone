const router = require('express').Router();

const userFunc = require('../functions/user')
const postFunc = require('../functions/post')
const reservationFunc = require('../functions/reservation')


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
    * Endpoint that lists all users
*/
router.route('/api/user/list').get(function (req, res) {
    userFunc.list()
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
    postFunc.listPost()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
});

/**
 * Endpoint responsible for calling the getById function
 * and sending back the response from it.
 * 
 * It will return the post with the id in the request available according to certain params
 * 
 * @param id - post id
 */
router.route('/api/post/get').get(function (req, res) {
    const { id } = req.query;
    console.log(id)

    postFunc.getById(id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
});


/**
 * Endpoint responsible creating a reservation for the user
 * 
 * @param id - post id
 * @param user - userObject
 * 
 */
router.route('/api/reservation/create').post(function (req, res) {
    const { id, user, idToken, dateStart, dateEnd } = req.query;
    console.log(id)

    reservationFunc.create(id, user, idToken, dateStart, dateEnd)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
});

/**
    * Endpoint that lists all reservations
*/
router.route('/api/reservation/list').get(function (req, res) {
    reservationFunc.list()
    .then(function (callback) {
        res.json(callback);
    }).catch(error => {
        res.json(error)
    });
});



module.exports = router;


