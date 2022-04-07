import * as T from './types'
import {combineReducers} from 'redux'

const initialDrawerChange = false
const drawerChangeReducer = (state = initialDrawerChange, action: T.Actions) => {
    switch(action.type) {
        case 'true' :
            return true
        case 'false' :
            return false
    }
    return state
}

export const reducer = combineReducers({
    drawerChange: drawerChangeReducer
})