const userModel = require('../models/user');
const postModel = require('../models/post');
const userFunc = require('./user');

module.exports = {
    createPost:(user, title, description, location, numberOfPeople, pricePerNight) => new Promise((resolve,reject) => {
        console.log(user)
        userFunc.verifyAccount(user)//Verify if user is correctly logged in
        .then(result => {

            //Create and save post object
            const mPost = new postModel({title, description, location, numberOfPeople, pricePerNight});
            mPost.save();

            //find user by the id of the result and push the post the posts entry in the user document
            userModel.findOneAndUpdate({ _id: result.user._id }, { $push: { posts: [mPost] }}, { new: true, useFindAndModify: false})
            .then(result => {
                console.log(result)
                resolve({
                    code: 200,
                    success: true,
                    message : 'Post create successfully',
                    post: result,
                })
            })
            .catch(error => {
                console.log(error)
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
    }),
}