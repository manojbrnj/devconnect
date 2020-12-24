import axios from 'axios'

import {TEST_ERRORS} from './types'
export const registerAction =(data,history)=>dispatch=>
{
    axios.post('/api/users/register', data).then(res => {
            //  console.log(res.data)
            // when user registered we redirect to login page
           return( history.push('/login'))
         }).catch(err => {
            
            dispatch({
                         type:TEST_ERRORS,
                         payload:err.response.data 
                    })

         })
};