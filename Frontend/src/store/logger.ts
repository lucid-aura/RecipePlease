import { Action, Dispatch } from 'redux'

export function logger<S = any>({getState}: {getState: () => S}) {
    return (next: Dispatch) => (action: Action) => {
        console.log('state berfore next', getState())
        console.log('action', action)
        const returnValue = next(action)
        console.log('state after next', getState())
        return returnValue
    }
}