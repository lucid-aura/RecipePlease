import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { logger } from "./logger"
import { rootReducer } from "./rootReducer"

export const makeStore = () => {
    let middlewares: any[] = [thunk]
    if(__DEV__) {   // 개발 모드일 때만 logger미들웨어를 적용
        middlewares.push(logger)
    }
    
    return createStore(rootReducer, applyMiddleware(...middlewares))
}