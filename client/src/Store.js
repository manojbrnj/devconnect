
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './Reducers';
var initialState ={}
// createStore will take reducer function with three args []{} enhancer:applymiddleware()
//thunk is a  middleware
const middleware = [thunk]
const store = createStore(rootReducers,initialState,compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
  latency: 0
})));


export default store;