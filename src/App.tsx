import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks]= useState <TasksType[]> ([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'HTML&CSS', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterType> ('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter( t => t.id !== id))
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)

    }
    console.log(filter)

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(tasks => !tasks.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(tasks => tasks.isDone)
    }



    return <div className='App'>
        <Todolist title='What to learn'
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
        />

    </div>
}

export default App;
