const validation = require('validator')
const isEmpty = require('./is_empty')
module.exports = function validateRegisterINput(Input){
var errors = {

}
if(!validation.isLength(Input.name,{min:7,max:30})){

    errors.name = "Name must be between 2 & 13 character"
}
return({errors,isValid:isEmpty(errors)})

} 