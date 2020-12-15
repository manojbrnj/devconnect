const validation = require('validator')

const isEmpty = require('./is_empty')


module.exports = function validationEducationInput(Input)
{
    const errors = {}

    Input.school = !isEmpty(Input.school) ? Input.school:''
    Input.degree = !isEmpty(Input.degree) ? Input.degree:''
    Input.fieldofstudy = !isEmpty(Input.degree) ? Input.degree:''


if(validation.isEmpty(Input.school))
{
   errors.school = "school field is required"
}
if(validation.isEmpty(Input.degree))
{
   errors.degree = "degree field is required"
}
if(validation.isEmpty(Input.fieldofstudy )) 
{
   errors.degree = "fieldofstudy field is required"
}
return (
    {errors,isValid:isEmpty(Input)}
)

}