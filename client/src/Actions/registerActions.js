import {TEST_DISPATCH} from './types'
export const registerAction =(data)=>
{
    return {
        type: TEST_DISPATCH,
        payload: data
    }
};