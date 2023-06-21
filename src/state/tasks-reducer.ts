import {TasksType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    idTodolist: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    idTodolist: string
}
type RenameTaskActionType = {
    type: 'RENAME-TASK'
    id: string
    idTodolist: string
    title: string
}
type ChangeStatusTaskActionType = {
    type: 'CHANGE-STATUS-TASK'
    id: string
    idTodolist: string
    isDone: boolean
}

type ActionType = RemoveTaskActionType | AddTaskActionType | RenameTaskActionType | ChangeStatusTaskActionType

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = {...state}
            let tasks = newState[action.idTodolist]
            let filteredTasks = tasks.filter(t => t.id !== action.id)
            newState[action.idTodolist] = filteredTasks
            return {...newState}
        }
        case 'ADD-TASK': {
            return {...state, [action.idTodolist]: [{id: v1(), title: action.title, isDone: false}, ...state[action.idTodolist]]}
        }
        case 'RENAME-TASK': {
            return {...state, [action.idTodolist]: state[action.idTodolist].map( t => t.id === action.id ? {...t, title: action.title } : t)}
            // let copyState = {...state}
            // let task = copyState[action.idTodolist].find(t => t.id === action.id)
            // if (task) {
            //     task.title = action.title
            // }
            // return copyState
        }
        case 'CHANGE-STATUS-TASK': {
            return {...state, [action.idTodolist]: state[action.idTodolist].map(task=> task.id===action.id?{...task, isDone:action.isDone}:task)}

            // let copyState = {...state}
            // let {...task} = copyState[action.idTodolist].find(t => t.id === action.id)
            // if ({...task}) {
            //     task.isDone = action.isDone
            // }
            // return copyState
        }
        default:
            throw new Error('This action type is undefined')
    }
}

export const removeTaskAC = (id: string, idTodolist: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, idTodolist}
}

export const addTaskAC = (title: string, idTodolist: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, idTodolist}
}

export const renameTaskAC = (id: string, idTodolist: string, title: string): RenameTaskActionType => {
    return {type: "RENAME-TASK", id, idTodolist, title}
}

export const changeStatusTaskAC = (id: string, idTodolist: string, isDone: boolean): ChangeStatusTaskActionType => {
    return {type: 'CHANGE-STATUS-TASK', id, idTodolist, isDone}
}



