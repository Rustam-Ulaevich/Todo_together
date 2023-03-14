import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolist-reducer";

const rootReucer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReucer)

export type AppRootStateType = ReturnType<typeof rootReucer>

// @ts-ignore
window.store = store
