import React, { Component } from 'react';
import axios from 'axios'
import firebase from 'firebase'

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:6200/api/post/list', null)
            .then(res => {
                let posts = res.data.post_list
                this.setState({ posts })
            })
            .catch(error => {
                console.table(error);
            })
    }

    render() {
        let { posts } = this.state;

        return (
            <>
                <ul>
                    {posts.map(currentPost => {
                        return (
                            <li>
                                <img
                                    className="col-md-2"
                                    src={currentPost.imageUrlList[0]}
                                    alt="new"
                                />
                                {currentPost.title} | {currentPost.description} | {currentPost.pricePerNight}
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default List;