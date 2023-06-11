import {TodolistType} from "../App";
// type RemoveTodolistType={
//     type:'REMOVE-TODOLIST'
//     id:string
// }
type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type ActionType = RemoveTodolistType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return {
                ...state, [action.id]: state.filter(el => {
                    return el.id !== action.id
                })
            }


            return state

            defualt: throw new Error('This action type is undefined')
    }
}


export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST' as const, id}
}
