import React, { Component } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import firebase from 'firebase';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: null,
            date: null,
            disabledDays:
                [
                    new Date(2020, 12, 5),
                    new Date(2020, 4, 12),
                ]
        }

        this.handleReservation = this.handleReservation.bind(this)
    }

    tileDisabled = ({ date }) => {
        if (date < new Date()) {
            return true
        }

        return !!this.state.disabledDays.find(item => { return item.getTime() == date.getTime() });
    }

    onChange = date => {
        for (let i = 0; i < this.state.info.reservations.length; i++) {
            console.log(this.state.info.reservations[i])

            const dateStart = new Date(this.state.info.reservations[i].dateStart);
            const dateEnd = new Date(this.state.info.reservations[i].dateEnd);
            dateStart.setDate(dateStart.getDate() - 1);
            dateEnd.setDate(dateEnd.getDate() - 1);

            console.log(date, dateStart, dateEnd)
            if (date[0] < dateStart && date[1] > dateEnd) {
                return false;
            }

        }

        this.setState({ date })
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get('http://127.0.0.1:6200/api/post/get', { params: { id } })
            .then(res => {
                console.log(res)
                let disabledDays = []

                for (let i = 0; i < res.data.reservations.length; i++) {

                    const dateStart = new Date(res.data.reservations[i].dateStart);
                    const dateEnd = new Date(res.data.reservations[i].dateEnd);
                    dateStart.setDate(dateStart.getDate() - 1);
                    dateEnd.setDate(dateEnd.getDate() - 1);

                    let loop = dateStart;

                    while (loop < dateEnd) {
                        disabledDays.push(loop);
                        var newDate = loop.setDate(loop.getDate() + 1);

                        loop = new Date(newDate);

                    }
                }

                console.log({ disabledDays })

                this.setState({ info: res.data, disabledDays })
            })
            .catch(error => {
                console.table(error);
            })
    }

    handleReservation(event) {
        const { id } = this.props.match.params;

        if (firebase.auth().currentUser == null) {
            return;
        }

        firebase.auth().currentUser.getIdToken(true)
            .then((idToken) => {

                axios.post('http://127.0.0.1:6200/api/reservation/create', null,
                    {
                        params: {
                            id,
                            idToken,
                            user: firebase.auth().currentUser,
                            dateStart: this.state.date[0],
                            dateEnd: this.state.date[1]
                        }
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(error => {
                        this.setState({ date: null })
                        console.table(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        const { info, date } = this.state

        let totalNights = 0, totalCost = 0;
        if (info != null) {

            if (date != null) {
                totalNights = Math.round(Math.abs((date[0] - date[1]) / (24 * 60 * 60 * 1000))) - 1;
                totalCost = info.pricePerNight * totalNights
            }

            console.log("asd", info)
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
                                        <h5 className="mt-1 " >{info.pricePerNight}$ / night</h5>
                                        <p className="mt-1 " >{totalNights} nights x {info.pricePerNight} $ = {totalCost}</p>
                                        <Button className="w-100 mt-5 post-reserve-button" onClick={() => this.handleReservation()}>Reserve</Button>
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
