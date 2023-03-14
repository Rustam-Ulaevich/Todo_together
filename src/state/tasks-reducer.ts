import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    todolistId: string
    isDone: boolean
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    todolistId: string
    title: string
}

type ActionTaskType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTaskType ): TasksStateType => {
    switch (action.type){
        case 'REMOVE-TASK':{
            state[action.todolistId] = state[action.todolistId].filter( t => t.id !== action.id)
            return {...state}
        }
        case 'ADD-TASK': {
            state[action.todolistId] = [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let task = state[action.todolistId].find( t => t.id === action.id)
            if(task){
                task.isDone = action.isDone
            }
            return {...state}
        }
        case 'CHANGE-TASK-TITLE':{
            let task = state[action.todolistId].find( t => t.id === action.id)
            if(task){
                task.title = action.title
            }
            return {...state}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state

    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", id, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (id: string, todolistId: string, status: boolean): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id, todolistId, isDone: status}
}

export const changeTaskTitleAC = (id: string, todolistId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, todolistId, title}
}
