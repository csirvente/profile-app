import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Signup extends Component {
	constructor(props) {
	    super(props)
	    this.myFile = React.createRef();
	    this.state = { username: '', password: '', campus: '', course: '', image: '' }
	}
	handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleFormSubmit (event) {
        event.preventDefault();
        const username=this.state.username
        const password=this.state.password
        const campus=this.state.campus
        const course=this.state.course
        const image=this.state.image
 

        axios.post("http://localhost:5000/auth/signup", { username, password, campus, course, image})
            .then((response) => {
                this.setState({ username: '', password: '', campus: '', course: '', image: '' })
                console.log(response)
                // after submitting the form, redirect to '/projects'
            })
            .catch(error => console.log(error))
    }
    uploadImage () {
    	console.log('change')
    	let formData = new FormData(this.myFile.current)
    	axios.post("http://localhost:5000/auth/upload", formData,
    		{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                crossDomain: true
            })
    	.then(response => {
    		console.log('okok', response.data)
    		this.setState({image: response.data.image})
    	})

    }
  render() {
    return (
      <div className="App">
      	<h1>Signup</h1>
        <div>
            <div>
                <label>User Name:</label>
                <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                <br/>
                <label>Password:</label>
                <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                <br/>
                <label>Campus:</label>
                <input type="text" name="campus" value={this.state.campus} onChange={(e) => this.handleChange(e)} />
                <br/>
                <label>Course:</label>
                <input type="text" name="course" value={this.state.course} onChange={(e) => this.handleChange(e)} />
                <br/>
                <form ref={this.myFile} action="http://localhost:5000/auth/upload" method="post" enctype="multipart/form-data">
	                <label>Image:</label>
	                <input type="file" ref={this.myFile} name="image" onChange={this.uploadImage.bind(this)}/>
                </form>
                <br/>
                <button onClick={this.handleFormSubmit.bind(this)}>Valider</button>
            </div>
        </div>
      </div>
    );
  }
}

export default Signup;
