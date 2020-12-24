import { TEST_ERRORS } from '../Actions/types'
const intialstate={
   
   data:{}
};
export default function(state = intialstate,action){

    switch(action.type)
    {
        

                case TEST_ERRORS : 
                return {data:action.payload};
                       
            
        default:
            return  state;

    }
   
}