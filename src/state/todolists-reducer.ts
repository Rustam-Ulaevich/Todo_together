import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType ={
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type RenameTodolistActionType = {
    type: 'RENAME-TODOLIST'
    id: string
    title: string
}
export type ChangeFilterTodolistActionType = {
    type: 'CHANGE-FILTER-TODOLIST'
    id: string
    filter: FilterValueType
}
type ActionType = RemoveTodolistActionType | AddTodolistActionType | RenameTodolistActionType | ChangeFilterTodolistActionType

const initialState: Array<TodolistType> =  []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)

        case 'ADD-TODOLIST':
            //debugger
            return [{id: action.todolistId, title: action.title, filter: "All"}, ...state]

        case "RENAME-TODOLIST":
           let todolist = [...state].find( tl => tl.id === action.id)
            if(todolist){
                todolist.title = action.title
            }
            return [...state]

        case "CHANGE-FILTER-TODOLIST":{
            let newState =  [...state]
            let todolist = newState.find( tl => tl.id === action.id)
            if(todolist){
                todolist.filter = action.filter
            }
            return newState
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title, todolistId: v1()}
}

export const renameTodolistAC = (id: string, title: string): RenameTodolistActionType => {
    return { type: "RENAME-TODOLIST", id, title}
}

export const changeFilterTodolistAC = (id: string, filter: FilterValueType): ChangeFilterTodolistActionType => {
    return { type: "CHANGE-FILTER-TODOLIST", filter, id}
}



