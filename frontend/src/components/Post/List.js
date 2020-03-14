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
                console.log("lmlmmlm", posts)
                this.setState({ posts })
            })
            .catch(error => {
                console.table(error);
            })
    }

    render() {
        console.log('asd', this.state.posts)

        let { posts } = this.state;

        console.log(posts)

        return (

            <>
                <ul>
                    {posts.map(currentVideo => {
                        return (
                            <li>
                                {currentVideo.title}|{currentVideo.description}|{currentVideo.pricePerNight}
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default List;