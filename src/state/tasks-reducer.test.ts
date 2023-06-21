import {addTaskAC, changeStatusTaskAC, removeTaskAC, renameTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksType} from "../App";

test('test should be return remove task', () => {

    // let todolistId1 = v1();
    // let todolistId2 = v1();

    const startState: TasksType = {
        "todolistId1": [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: false},
            {id: '3', title: 'JS', isDone: false},
        ],
        "todolistId2": [
            {id: '1', title: 'Beer', isDone: false},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Meat', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, removeTaskAC('2', "todolistId1"))

    expect(endState["todolistId1"].length).toBe(2)
})

test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('juice', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = renameTaskAC('3', 'todolistId1', 'New task', )

    const endState = tasksReducer(startState, action)

    expect(startState['todolistId1'][2].title).toBe('React')
    expect(endState['todolistId1'][2].title).toBe('New task')
})

test('status of specified task should be changed', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeStatusTaskAC('2', 'todolistId2', false, )

    const endState = tasksReducer(startState, action)

    expect(startState['todolistId2'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(false)
})
