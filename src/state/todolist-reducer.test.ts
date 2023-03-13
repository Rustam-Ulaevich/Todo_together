import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistTitleAC, changeValueFilterAC,
    ChangeValueFilterActionType,
    removeTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {FilterValueType, TodolistType} from "../App";

test('Remove todolist', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'White to learn', filter: 'All'},
        {id: todolistId2, title: 'White to buy', filter: 'All'},
    ]

    let endState = todolistsReducer(
        startState, removeTodolistAC(todolistId2)
    )

    expect(endState.length).toBe(1)
})

test('Add todolist', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'Bla', filter: 'All'},
        {id: todolistId2, title: 'AAA', filter: 'All'},
    ]

    let newNameTodolist = 'BBB'

    let endState = todolistsReducer( startState,
        addTodolistAC(newNameTodolist)
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('BBB')
})

test('Change todolist title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startstate: Array<TodolistType> = [
        {id: todolistId1, title: 'AAA', filter: 'All'},
        {id: todolistId2, title: 'BBB', filter: 'All'},
    ]

    let newTitle = 'CCC'

    let endState = todolistsReducer( startstate,
        changeTodolistTitleAC(todolistId2, newTitle)
)

    expect(endState[1].title).toBe('CCC')
})

test('Change value filter', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'A', filter: 'All'},
        {id: todolistId2, title: 'A', filter: 'All'},
    ]

    let newValue: FilterValueType = "Active"

    let endState = todolistsReducer( startState, changeValueFilterAC(todolistId2, newValue))

    expect(endState[1].filter).toBe('Active')
})
