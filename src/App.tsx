import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";


function App() {

    let task1: TasksType[] = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]

    let task2: TasksType[] = [
        {id: 1, title: 'Book', isDone: true},
        {id: 2, title: 'Milk', isDone: true},
        {id: 3, title: 'PC', isDone: false},
    ]

    return <div className='App'>
        <Todolist title='What to learn'
                  tasks={task1}
        />
        <Todolist title='What to buy'
                  tasks={task2}
        />
    </div>
}

export default App;
