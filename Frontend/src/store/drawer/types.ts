import {Action} from 'redux'

export type State = {
    drawerChange:boolean
}

export type DrawerChangeFalseAction = Action<'false'>
export type DrawerChangeTrueAction = Action<'true'>

export type Actions = DrawerChangeFalseAction | DrawerChangeTrueAction