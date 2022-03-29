import { createStore } from "redux"
import { rootReducer } from "./rootReducer"


export const makeStore = () => {
    const store = createStore(rootReducer)
    return store
}