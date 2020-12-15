import React, { Component } from 'react'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            errors: ""
        }
        this.formUpdate =this.formUpdate.bind(this)
        this.onSubmit =this.onSubmit.bind(this)
    }


    formUpdate(event) {

        this.setState(
            {
                [event.target.name]: event.target.value
             
            }        )

         
    }


    onSubmit(event){
        event.preventDefault();
let data={
    name:this.state.name,
    email:this.state.email,
   errors : this.state.errors
}
console.log(data)
    }


    render() {
        return (
            // <!-- Register -->
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit} >
                                <div className="form-group">
                                    <input type="text" onChange={this.formUpdate} className="form-control form-control-lg" placeholder="Name" value={this.state.name} name="name" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" onChange={this.formUpdate} value={this.state.email} className="form-control form-control-lg" placeholder="Email Address" name="email" />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.formUpdate} value={this.state.password} className="form-control form-control-lg" placeholder="Password" name="password" />
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.formUpdate} value={this.state.password} className="form-control form-control-lg" placeholder="Confirm Password" name="password2" />
                                </div>
                                <input type="submit"  className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register