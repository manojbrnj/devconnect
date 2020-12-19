const validator = require('validator')
const isEmpty = require('./is_empty')
module.exports = function loginValidator(Input){

 Input.email = !isEmpty(Input.email) ? Input.email:''
Input.password = !isEmpty(Input.password) ? Input.password:''
var errors = { 

}
if(!validator.isEmail(Input.email)){

errors.email = "Email is not corrrect"
}
if(!validator.isLength(Input.email,{min:2,max:30})){

    errors.email = "Email is not corrrect"
    }
if(!validator.isLength(Input.password,{min:2,max:30}))
{
    errors.password = " Wrong password"
}
return  ({
    errors,
    isValid : isEmpty(errors)
   
})


}