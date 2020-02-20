import React, {Component} from 'react';
import axios from 'axios'
import firebase from 'firebase'

class Create extends Component {
    constructor(props){
        super(props);

        this.state = {
            user : null,
            title : '',
            description : '',
            numberOfPeople : 0,
            pricePerNight : 0,
            location : '',
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    componentDidMount() {
        var that = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				that.setState({ user });
			} else {
				that.setState({ user: null });
			}
		});
	}


    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }
    handleSubmit(){
        console.table(this.state.user)
        axios.post('http://127.0.0.1:6200/api/post/create', null,
        {
            params:{
                user: firebase.auth().currentUser,
                title: this.state.title,
                description: this.state.description,
                numberOfPeople: this.state.numberOfPeople,
                pricePerNight: this.state.pricePerNight,
                location: this.state.location,

            }
        })
        .then(res => {
            console.table(res);
        })
        .catch(error => {
            console.table(error);
        })
    }

    render(){
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange}/>
                    </label>

                    <label>
                        Description:
                        <input name="description" type="text" value={this.state.description} onChange={this.handleInputChange}/>
                    </label>

                    <label>
                        number Of People:
                        <input name="numberOfPeople" type="number" value={this.state.numberOfPeople} onChange={this.handleInputChange}/>
                    </label>

                    <label>
                        price Per Night:
                        <input name="pricePerNight" type="number" value={this.state.pricePerNight} onChange={this.handleInputChange}/>
                    </label>

                    <label>
                        Location:
                        <input name="location" type="text" value={this.state.location} onChange={this.handleInputChange}/>
                    </label>

                    <input type="submit" value="Submit"/>
                </form>
            </>
        )
    }
}

export default Create;