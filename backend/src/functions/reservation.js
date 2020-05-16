const userModel = require('../models/user');
const postModel = require('../models/post');
const reservationModel = require('../models/reservation');
const userFunc = require('./user');

module.exports = {
    create: (id, user, idToken, dateStart, dateEnd) => new Promise((resolve, reject) => {
        userFunc.verifyAccount(user, idToken)//Verify if user is correctly logged in
            .then(result => {
                
                //Create and save post object
                const mReservation = new reservationModel({ post: id, creator: result._id, dateStart, dateEnd });
                mReservation.save();

                //find user by the id of the result and push the reservation entry in the user document
                userModel.findByIdAndUpdate(result.user._id , { $push: { reservations: [mReservation] } }, { new: true, useFindAndModify: false })
                    .then(() => {
                        //find post by the id of the result and push the reservation entry in the post document
                        postModel.findByIdAndUpdate( id, { $push: { reservations: [mReservation] } }, { new: true, useFindAndModify: false })
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(new Error(error))
                        });
                    })
                    .catch(error => {
                        reject(new Error(error))
                    });
            })
            .catch(error => {
                reject(new Error(error))
            });
    }),
    list: () => new Promise((resolve, reject) => {
        reservationModel.find()
            .then(result => {
                console.log(result)
                resolve(result)
            })
            .catch(error => {
                reject(new Error(error))
            })
    }),
}