const validation = require('validator')
const isEmpty = require('./is_empty')
module.exports = function validateRegisterINput(Input){
    Input.name = !isEmpty(Input.name) ? Input.name:''
    Input.email = !isEmpty(Input.email) ? Input.email:''
    Input.password = !isEmpty(Input.password) ? Input.password:''
    Input.cpassword = !isEmpty(Input.cpassword) ? Input.cpassword:''
var errors = {

}
if(!validation.isLength(Input.name,{min:2,max:30})){

    errors.name = "Name must be between 2 & 13 character"
}
if(validation.isEmpty(Input.name)){

    errors.name = "name field is required"
}
if(validation.isEmpty(Input.email)){

    errors.email = "email field is required"
}
if(!validation.isEmail(Input.email)){

    errors.email = "Emaili is in valid"
}
if(!validation.isLength(Input.password,{min:2,max:30})){

    errors.password = "password must be between 2 & 13 character"
}

if(validation.isEmpty(Input.password)){

    errors.password = "password field required"
}


if(validation.isEmpty(Input.cpassword)){

    errors.cpassword = "cpassword field required"
}
if(!validation.equals(Input.cpassword,Input.password)){

    errors.cpassword = "cpassword must be same as password"
}


return({errors,isValid:isEmpty(errors)})

} 