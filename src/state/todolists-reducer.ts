import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistType={
    type:'REMOVE-TODOLIST'
    id:string
}
type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}
type RenameTodolistType = {
    type: 'RENAME-TODOLIST'
    id: string
    title: string
}
type ChangeFilterTodolistType = {
    type: 'CHANGE-FILTER-TODOLIST'
    id: string
    filter: FilterValueType
}

type ActionType = RemoveTodolistType | AddTodolistType | RenameTodolistType | ChangeFilterTodolistType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST':{
            return [...state, {id: v1(), title: action.title, filter: "All"}]
        }
        case "RENAME-TODOLIST":{
           let todolist = [...state].find( tl => tl.id === action.id)
            if(todolist){
                todolist.title = action.title
            }
            return [...state]
        }
        case "CHANGE-FILTER-TODOLIST":{
            let newState =  [...state]
            let todolist = newState.find( tl => tl.id === action.id)
            if(todolist){
                todolist.filter = action.filter
            }
            return newState
        }
        default:
            throw new Error('This action type is undefined')
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return { type: "ADD-TODOLIST", title}
}

export const renameTodolistAC = (id: string, title: string): RenameTodolistType => {
    return { type: "RENAME-TODOLIST", id, title}
}

export const changeFilterTodolistAC = (id: string, filter: FilterValueType): ChangeFilterTodolistType => {
    return { type: "CHANGE-FILTER-TODOLIST", filter, id}
}



