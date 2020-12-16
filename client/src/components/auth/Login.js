import React, { Component } from 'react'
import axios from 'axios'



class Login extends Component {

constructor()
{
super();
this.state ={
    email:"",
    password:"",
    errors:""
}
this.onChange=this.onChange.bind(this);
this.onSubmit=this.onSubmit.bind(this);
}

onChange(event){

    this.setState({
        [event.target.name] : event.target.value
    })
}

onSubmit(event){
event.preventDefault();
    const data= {
        email: this.state.email,
        password:this.state.password
    }

    axios.post("api/users/login",data).then(res=>{console.log(res.data.token)}).catch(err=>{console.log(`line number 34 Loginjs client ${err}`)})
    
}


    render() {
        return (
            // <!-- Login -->
            <div className="login">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DevConnector account</p>
                    <form  onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input type="email" value={this.state.email} onChange={this.onChange} className="form-control form-control-lg" placeholder="Email Address" name="email" />
                      </div>
                      <div className="form-group">
                        <input type="password" value={this.state.password} onChange={this.onChange} className="form-control form-control-lg" placeholder="Password" name="password" />
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
export default Login