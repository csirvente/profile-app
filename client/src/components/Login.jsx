import React, { Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)
        this.state={username:'',password:''}
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit (event) {
    	console.log('event', event)
        event.preventDefault();
        const username=this.state.username
        const password=this.state.password
 

        axios.post("http://localhost:5000/auth/login", { username, password})
            .then((response) => {
            	this.props.logUser(response.data)
                this.setState({ username: '', password: '', campus: '', course: '', image: '' })
                console.log(response)
                // after submitting the form, redirect to '/projects'
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                    <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}

export default Login;