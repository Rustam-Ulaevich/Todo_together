import {userReducer} from "./user-reducer";

test('change the user ', () => {
    const startState = {age: 20, childrenCount: 3, name: 'Rustam'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
})

test('change children count', ()=> {
    const startState = {age: 20, childrenCount: 3, name: 'Rustam'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(4)
})

test('change user name', ()=> {
    const startState = {age: 27, childrenCount: 3, name: 'Rustam'}
    const newName = 'Rustam Ulaevich'

    const endState = userReducer(startState, {type: 'UPGRADE-NAME', name: newName})

    expect(endState.name).toBe('Rustam Ulaevich')
})
