import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistTitleAC, changeValueFilterAC,
    ChangeValueFilterActionType,
    removeTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {FilterValueType, TodolistType} from "../App";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach( () => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'White to learn', filter: 'All'},
        {id: todolistId2, title: 'White to buy', filter: 'All'},
    ]
})

test('Remove todolist', () => {

    let endState = todolistsReducer(startState, removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
})

test('Add todolist', () => {

    let newNameTodolist = 'BBB'

    let endState = todolistsReducer( startState,
        addTodolistAC(newNameTodolist)
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('BBB')
})

test('Change todolist title', () => {

    let newTitle = 'CCC'

    let endState = todolistsReducer(
        startState,
        changeTodolistTitleAC(todolistId2, newTitle)
    )

    expect(endState[1].title).toBe('CCC')
})

test('Change value filter', () => {

    let newValue: FilterValueType = "Active"

    let endState = todolistsReducer( startState, changeValueFilterAC(todolistId2, newValue))

    expect(endState[1].filter).toBe('Active')
})
