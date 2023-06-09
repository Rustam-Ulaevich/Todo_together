import {TodolistType} from "../App";

type ActionType = {
    type: string
    [key: string]: string
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':

            return state

        case 'ADD-TODOLIST':

            return state

        case 'RENAME-TODOLIST':

            return state

        defualt: throw new Error('This action type is undefined')
    }
}
