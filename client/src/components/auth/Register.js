import React, { Component } from 'react'
import axios from 'axios'
import classname from 'classnames'
import {connect} from 'react-redux'

import {registerAction} from '../../Actions/registerActions';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            cpassword: "",
            errors: {},
        }
        this.formUpdate = this.formUpdate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    formUpdate(event) {

        this.setState(
            {
                [event.target.name]: event.target.value

            })


    }


    onSubmit(event) {
        event.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cpassword: this.state.cpassword,
            errors: this.state.errors
        }
        console.log(data)

        this.props.registerAction(data)

        // axios.post('/api/users/register', data).then(res => {
        //     console.log(res.data)
        // }).catch(err => {
            
        //     this.setState({ errors: err.response.data });
        //     console.log(this.state.errors)

        // })
    }


    render() {
        const {errors} = this.state;
        const {user} = this.props.auth; // here we are using data coming from combine reducers where all reducers data is available on single place
        return (
            // <!-- Register -->
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit} >
                                <div className="form-group">
                                    <input type="text" onChange={this.formUpdate} className={classname("form-control form-control-lg",{'is-invalid':errors.name})} placeholder="Name" value={this.state.name} name="name" required />
        {errors.name && <div className="invalid-feedback">{errors.name}</div> }
                                </div>
                                <div className="form-group">
                                    <input type="text" onChange={this.formUpdate} value={this.state.email} className={classname("form-control form-control-lg",{'is-invalid': errors.email})} placeholder="Email Address" name="email" />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.formUpdate} value={this.state.password} className={classname("form-control form-control-lg",{'is-invalid':errors.password})} placeholder="Password" name="password" />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.formUpdate} value={this.state.cpassword} className={classname("form-control form-control-lg",{'is-invalid':errors.cpassword})} placeholder="Confirm Password" name="cpassword" />
        {errors.cpassword && <div className="invalid-feedback">{errors.cpassword}</div>}

                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}



const  mapStateToProps=(state) =>({   
     auth:state.auth   //this auth is from combine reducers to access auth from combine reducer so we can use data from action like : this.props.auth.user // in simple this data is coming from redux which we have implemented
  });
export default connect(mapStateToProps,{registerAction})(Register); //connect is from react-redux connect is hof (higher order function) here we are passing action son we can access that action and gice data to action funtion as we know action s are funtions  