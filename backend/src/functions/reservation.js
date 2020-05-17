const userModel = require('../models/user');
const postModel = require('../models/post');
const reservationModel = require('../models/reservation');
const userFunc = require('./user');
const postFunc = require('./post');

module.exports = {
    create: (id, user, idToken, dateStart, dateEnd) => new Promise((resolve, reject) => {
        module.exports.validate(id, dateStart, dateEnd)
            .then(() => {
                userFunc.verifyAccount(user, idToken)//Verify if user is correctly logged in
                    .then(result => {

                        //Create and save post object
                        const mReservation = new reservationModel({ post: id, creator: result._id, dateStart, dateEnd });
                        mReservation.save();

                        //find user by the id of the result and push the reservation entry in the user document
                        userModel.findByIdAndUpdate(result.user._id, { $push: { reservations: [mReservation] } }, { new: true, useFindAndModify: false })
                            .then(() => {
                                //find post by the id of the result and push the reservation entry in the post document
                                postModel.findByIdAndUpdate(id, { $push: { reservations: [mReservation] } }, { new: true, useFindAndModify: false })
                                    .then(result => {
                                        console.log("success")
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
            })
            .catch(error => {
                console.log(error)
                reject(new Error(error))
            });
    }),

    validate: (id, dateStart, dateEnd) => new Promise((resolve, reject) => {
        postFunc.getById(id)
        .then(result => {
            dateStart = new Date(dateStart)
            dateEnd = new Date(dateEnd)

            for (let i = 0; i < result.reservations.length; i++) {

                console.log(result.reservations[i].dateStart)
                console.log(result.reservations[i].dateEnd)
                if (dateStart < result.reservations[i].dateStart && dateEnd > result.reservations[i].dateEnd) {
                    reject(new Error("Already reserved"))
                }
            }

            resolve()
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
    })
}