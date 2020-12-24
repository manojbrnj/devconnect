import {TEST_LOGIN_ERROR} from './types'
import axios from 'axios'
export const LoginAction=(data)=>dispatch=>{
    axios.post('/api/users/login', data).then(res => {
        console.log(res.data)
    }).catch(err => {
       
       dispatch({
                    type:TEST_LOGIN_ERROR,
                    payload:err.response.data 
               })

    })
}
    
