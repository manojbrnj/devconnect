const validation = require('validator')
const isEmpty = require('./is_empty')
module.exports = function validateExperienceINput(Input){
    Input.company = !isEmpty(Input.company) ? Input.company:''
    Input.title = !isEmpty(Input.title) ? Input.title:''
    Input.from = !isEmpty(Input.from) ? Input.from:''
    Input.to = !isEmpty(Input.to) ? Input.to:''
var errors = {

}

if(validation.isEmpty(Input.company)){

    errors.company = "company field is required"
}
if(validation.isEmpty(Input.title)){

    errors.title = "title field is required"
}



if(validation.isEmpty(Input.from)){

    errors.from = "from field required"
}


if(validation.isEmpty(Input.to)){

    errors.to = "to field required"
}



return({errors,isValid:isEmpty(errors)})

} 