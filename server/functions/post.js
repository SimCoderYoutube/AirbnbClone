const userModel = require('../models/user');
const postModel = require('../models/post');
const userFunc = require('./user');

module.exports = {
    createPost:(user, title, description, location, numberOfPeople, pricePerNight) => new Promise((resolve,reject) => {
        userFunc.verifyAccount(user)
        .then(result => {
            const mPost = new postModel({title, description, location, numberOfPeople, pricePerNight});
            mPost.save();

            userModel.findOneAndUpdate({ _id: result.user._id }, { $push: { posts: [mPost] }}, { new: true, useFindAndModify: false})
            .then(result => {
                resolve({
                    code: 200,
                    success: true,
                    message : 'Post create successfully',
                    post: result,
                })
            })
            .catch(error => {
                reject({
                    code: 400,
                    success: false,
                    message : 'failed to create a new Post',
                    error: error,
                })
            });
        })
        .catch(error => {
            reject(error)
        });
    })
}