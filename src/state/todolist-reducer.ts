import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    newName: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeValueFilterActionType = {
    type: 'CHANGE-VALUE-FILTER'
    id: string
    value: FilterValueType

}

export type ActionTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeValueFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter( tl => tl.id !== action.id)]

        case 'ADD-TODOLIST':
            return [
                {id: action.todolistId, title: action.newName, filter: "All"},
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find( tl => tl.id === action.id)
            if(todolist){
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-VALUE-FILTER':{
            let todolist = state.find( tl => tl.id === action.id)
            if(todolist){
                todolist.filter = action.value
            }
            return [...state]
        }
        default:
            throw new Error('no action type')

    }
}

export const removeTodolistAC = (todolistId2: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId2}
}

export const addTodolistAC = (newNameTodolist: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", newName: newNameTodolist, todolistId: v1()}
}

export const changeTodolistTitleAC = (todolistId2: string, newTitle: string): ChangeTodolistTitleActionType => {
    return  {type: "CHANGE-TODOLIST-TITLE", id: todolistId2, title: newTitle}}

export const changeValueFilterAC = (todolistId2: string, newValue: FilterValueType):
    ChangeValueFilterActionType => {
    return { type: "CHANGE-VALUE-FILTER", id: todolistId2, value: newValue}
}
