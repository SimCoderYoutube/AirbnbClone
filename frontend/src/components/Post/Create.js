import React, { Component } from 'react';
import axios from 'axios'
import firebase from 'firebase'

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            title: '',
            description: '',
            numberOfPeople: 0,
            pricePerNight: 0,
            location: '',
            images: []
        }


        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount() {
        var that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.setState({ user });
            } else {
                that.setState({ user: null });
            }
        });
    }


    handleFileChange(event) {
        this.setState({ images: event.target.files })
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {

        let totalSaved = 0;
        let downloadUrlList = []
        for (let i = 0; i < this.state.images.length; i++) {


            this.state.images[i].timestamp = Date.now()

            const uploadTask = firebase.storage().ref(`/posts/${firebase.auth().currentUser.uid}/${this.state.images[0].timestamp}`).put(this.state.images[0])
            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }

                }, (err) => {
                    console.log(err)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then(downloadURL => {

                            downloadUrlList.push(downloadURL)

                            console.log(downloadUrlList)

                            totalSaved++
                            if (totalSaved >= this.state.images.length) {
                                firebase.auth().currentUser.getIdToken(true)
                                    .then((idToken) => {
                                        console.log(idToken)
                                        axios.post('http://127.0.0.1:6200/api/post/create', null,
                                            {
                                                params: {
                                                    user: firebase.auth().currentUser,
                                                    title: this.state.title,
                                                    description: this.state.description,
                                                    numberOfPeople: this.state.numberOfPeople,
                                                    pricePerNight: this.state.pricePerNight,
                                                    location: this.state.location,
                                                    idToken,
                                                    downloadUrlList
                                                }
                                            })
                                            .then(res => {
                                                console.log(res);
                                            })
                                            .catch(error => {
                                                console.log(error);
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })

                            }
                        })
                })
        }

    }

    render() {
        return (
            <>
                <div onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                    </label>

                    <label>
                        Description:
                        <input name="description" type="text" value={this.state.description} onChange={this.handleInputChange} />
                    </label>

                    <label>
                        number Of People:
                        <input name="numberOfPeople" type="number" value={this.state.numberOfPeople} onChange={this.handleInputChange} />
                    </label>

                    <label>
                        price Per Night:
                        <input name="pricePerNight" type="number" value={this.state.pricePerNight} onChange={this.handleInputChange} />
                    </label>

                    <label>
                        Location:
                        <input name="location" type="text" value={this.state.location} onChange={this.handleInputChange} />
                    </label>

                    <input type="file" multiple onChange={this.handleFileChange} />

                    <input type="submit" value="Submit" onClick={this.handleSubmit} />
                </div>
            </>
        )
    }
}

export default Create;