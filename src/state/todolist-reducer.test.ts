import {v1} from "uuid";
import {todolistsReducer} from "./todolist-reducer";
import {TodolistType} from "../App";

test('Remove todolist', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'White to learn', filter: 'All'},
        {id: todolistId2, title: 'White to buy', filter: 'All'},
    ]

    let endState = todolistsReducer(
        startState, {type: 'REMOVE-TODOLIST', id: todolistId2}
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

    let endState = todolistsReducer( startState, {
        type: 'ADD-TODOLIST',
        newName: newNameTodolist
    }
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

    let endState = todolistsReducer( startstate, {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTitle
    })

    expect(endState[1].title).toBe('CCC')
})
