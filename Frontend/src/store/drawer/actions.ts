import type * as T from './types'

export const drawerChangeTrueAction = (): T.DrawerChangeTrueAction => ({
    type: 'true'
})

export const drawerChangeFalseAction = ():T.DrawerChangeFalseAction => ({
    type: 'false'
})