import {TEST_LOGIN_ERROR} from '../Actions/types'
const initialstate={
    data:{}
}
export default function(state=initialstate,action){
    switch(action.type)
    {
        case TEST_LOGIN_ERROR:
          return {data:action.payload};
          default:
              return state;
    }
}