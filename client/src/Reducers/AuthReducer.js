import { TEST_DISPATCH } from '../Actions/types'
import { TEST_ERRORS  } from '../Actions/types'
const intialstate={
    isAuthorized :false,
    user:{}
};
export default function(state = intialstate,action){

    switch(action.type)
    {
        case TEST_DISPATCH : 
            return  {
                   ...state,user:action.payload
                   
                };

                case TEST_ERRORS : 
                return  {
                       ...state,user:action.payload
                       
                    };
            
        default:
            return  state;

    }
   
}



