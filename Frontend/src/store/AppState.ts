import * as L from './login'
import * as D from './drawer'

export type AppState = {
    login: L.State
    drawer: D.State
}