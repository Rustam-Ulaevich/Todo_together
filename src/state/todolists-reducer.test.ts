import {
    addTodolistAC, changeFilterTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {FilterValueType, TodolistType} from '../AppWithRedux'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    let newTodolistTitle = 'NEW TODOLIST'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[1].id).toBe(todolistId1)
})

test('correct todolist change its name', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    let newTodolistTitle = 'NEW TODOLIST'

    const endState = todolistsReducer(
        startState,
        renameTodolistAC(todolistId1, newTodolistTitle)
    )

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId1)
    expect(endState[0].title).toBe('NEW TODOLIST')
})

test('correct todolist change filter', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    let newTodolistFilter: FilterValueType = 'Active'

    const endState = todolistsReducer(
        startState,
        changeFilterTodolistAC(todolistId1, newTodolistFilter)
    )

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(newTodolistFilter)
    expect(endState[1].filter).toBe('All')
})
