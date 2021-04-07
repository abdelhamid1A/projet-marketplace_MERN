import {createStore,combineReducers,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import cartReducer from './reducers/cartReducer'
import throttle from 'lodash.throttle'

function loadState() {
    const state = localStorage.getItem('cart');
    if(state !== null){
        return JSON.parse(state)
    }
    return {
        cart : []
    }
}

function saveState(state){
    console.log('state changed');
    localStorage.setItem('cart',JSON.stringify(state))
}

const AppReducer = combineReducers({
    cart:cartReducer
})

const store = createStore(AppReducer,loadState(),compose(
    // applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
store.subscribe(throttle(()=>{
    saveState(store.getState())
}),2000)

export default store