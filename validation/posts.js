const validator = require('validator')
const isEmpty = require('../validation/is_empty')


module.exports =function ValidatorPost(Input){
    const {errors,isValid} = ValidatorPost(req.text)
    if(!isValid)
    {
        return res.status(400).json(errors)
    }
Input.text = !isEmpty(Input.text) ? Input.text : ' ';


if(!validator.isLength(Input.text,{min:10,max:100}))
{
    errors.textError = "text should be min 10 and max 100"
}



if(validator.isEmpty(Input.text))
{
    errors.textError = "text should not be empty"
}


return({errors,isValid:isEmpty(errors)})
}