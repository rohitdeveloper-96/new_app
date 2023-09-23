import { combineReducers, createStore } from 'redux'
import adminReducers from '../store/adminReducers'
import UserList from './userReducers'
const rootreducrs = combineReducers({
    admin: adminReducers,
    users: UserList
})

export const stores = createStore(rootreducrs)
