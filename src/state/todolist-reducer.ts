import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (
    state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter( tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [
                {id: v1(), title: action.newName, filter: "All"},
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE':
            let todolist = state.find( tl => tl.id === action.id)
                if(todolist){
                    todolist.title = action.title
                }
            return [...state]
        default:
            throw new Error('no action type')

    }
}
