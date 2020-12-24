import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {LoginAction} from '../../Actions/LoginAction';


class Login extends Component {

constructor()
{
super();
this.state ={
    email:"",
    password:"",
    errors:{}
}
this.onChange=this.onChange.bind(this);
this.onSubmit=this.onSubmit.bind(this);
}

onChange(event){

    this.setState({
        [event.target.name] : event.target.value
    })
}

async onSubmit(event){
event.preventDefault();
    const data= { 
        email: this.state.email,
        password:this.state.password
    }

  //  axios.post("api/users/login",data).then(res=>{console.log(res.data.token)}).catch(err=>{this.setState({errors: err.response.data
  // })
  // console.log(this.state.errors)
  
  // })
    this.props.LoginAction(data);


}


componentWillReceiveProps(nextProps){
  if(nextProps.loginerrorsx){
      this.setState({errors:nextProps.loginerrorsx.data})
  }
}




    render() {
      const {errors} = this.state;
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
                      {/* <input type="text" value={this.state.email} onChange={this.onChange} className='form-control form-control-lg' placeholder="Email Address" name="email" /> */}

                       <input type="text" value={this.state.email} onChange={this.onChange} className={classnames('form-control form-control-lg',{'is-invalid':errors.email})} placeholder="Email Address" name="email" />
                     
        {errors.email && <div className="form-control form-control-lg bg-warning">{errors.email }</div>}
       

                      </div>
                      <div className="form-group"> 
                      {/* <input type="password" value={this.state.password} onChange={this.onChange} className="form-control form-control-lg" placeholder="Password" name="password" /> */}
                        <input type="password" value={this.state.password} onChange={this.onChange} className={classnames("form-control form-control-lg",{'is-invalid':errors.password})} placeholder="Password" name="password" />
                        {(errors.password ) && <div className="form-control form-control-lg bg-warning">{errors.password} Invalid</div>} 
                        {(typeof this.state.errors === 'string' ) && <div className="form-control form-control-lg bg-warning">Invalid Email id or password</div>} 

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
 loginerrorsx:state.loginerrors  // (state.auth) this auth is from combine reducers to access auth from combine reducer so we can use data from action like : this.props.auth.user // in simple this data is coming from redux which we have implemented
});




export default connect(mapStateToProps,{LoginAction})(Login)