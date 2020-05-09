const userModel = require('../models/user');
const postModel = require('../models/post');
const userFunc = require('./user');

module.exports = {
    createPost: (user, idToken, title, description, location, numberOfPeople, pricePerNight, imageUrlList) => new Promise((resolve, reject) => {
        console.log(idToken)
        userFunc.verifyAccount(user, idToken)//Verify if user is correctly logged in
            .then(result => {
                console.log({result})
                //Create and save post object
                const mPost = new postModel({ title, description, location, numberOfPeople, pricePerNight, imageUrlList });
                mPost.save();

                //find user by the id of the result and push the post the posts entry in the user document
                userModel.findOneAndUpdate({ _id: result.user._id }, { $push: { posts: [mPost] } }, { new: true, useFindAndModify: false })
                    .then(result => {
                        console.log(result)
                        resolve({
                            code: 200,
                            success: true,
                            message: 'Post create successfully',
                            post: result,
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        reject({
                            code: 400,
                            success: false,
                            message: 'failed to create a new Post',
                            error: error,
                        })
                    });
            })
            .catch(error => {
                console.log({error})
                reject(error)
            });
    }),

    listPost: () => new Promise((resolve, reject) => {
        postModel.find()
            .then(result => {
                console.log(result)
                resolve({
                    code: 200,
                    success: true,
                    message: 'Post(s) found successfully',
                    post_list: result,
                })
            })
    })
}