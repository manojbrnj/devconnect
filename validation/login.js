const validator = require('validator')
const isEmpty = require('./is_empty')
module.exports = function loginValidator(data){
let errors = {}
data.email = !isEmpty(data.email) ? data.email:''
data.password = !isEmpty(data.password) ? data.password:''
if(!validator.isEmail(data.email)){

errors.emali = "Email is not corrrect"
}

if(!validator.isLength(data.password,{min:2,max:30}))
{
    errors.password = " Wrong password"
}
return  ({
    errors,
    isValid : isEmpty(errors)
})


}