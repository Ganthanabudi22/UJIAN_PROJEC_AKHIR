import { combineReducers } from 'redux'
import User from './userGlobal'
import Cart from './cartCount'

export default combineReducers({
    user : User,
    cart :Cart
})