import React, { Component } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: null,

            disabledDays:
                [
                    new Date(2020, 12, 5),
                    new Date(2020, 4, 12),
                ]
        }
    }

    tileDisabled = ({ date }) => {
        if (date < new Date()) {
            return true
        }

        return !!this.state.disabledDays.find(item => { return item.getTime() == date.getTime() });
    }

    componentDidMount() {
        const { id } = this.props.match.params
        console.log(id, "sdasd")

        axios.get('http://127.0.0.1:6200/api/post/get', { params: { id } })
            .then(res => {
                console.log(res)
                this.setState({ info: res.data })
            })
            .catch(error => {
                console.table(error);
            })
    }

    render() {


        const { info } = this.state
        console.log(info)

        if (info != null) {
            return (
                <div>
                    <img
                        className="post-header-image"
                        src={info.imageUrlList[0]}
                        alt="new"
                    />



                    <div className="container mt-5">

                        <div className="row">

                            <div className="col-md-7" >
                                <h1>{info.title}</h1>
                                <h5 className="mt-1">{info.location}</h5>

                                <hr />
                                <p className="mt-1">{info.description}</p>
                                <Calendar
                                    className="mt-5"
                                    onChange={this.onChange}
                                    value={this.state.date}
                                    selectRange
                                    tileDisabled={this.tileDisabled} />
                            </div>

                            <div className="col-md-4" >
                                <Card raised>
                                    <CardContent>
                                        <h5 className="mt-1 " >{info.pricePerNight}5$ / night</h5>
                                        <Button className="w-100 mt-5 post-reserve-button ">Reserve</Button>
                                    </CardContent>

                                </Card>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
        return (
            <>
            </>
        )
    }
}

export default Post
