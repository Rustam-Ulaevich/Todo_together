import React, {useState} from 'react';
import './App.css';
import {ToDo} from './ToDo';
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type ValueFilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<ValueFilterType>('All')

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const removeTasks = (id: string) => {
       setTasks(tasks.filter( t => t.id !== id))
    }

    const changeFiler = (value: ValueFilterType) => {
        setFilter(value)
    }
    let tasksForTodo = tasks
    if (filter === 'Active'){
        tasksForTodo = tasks.filter( t => t.isDone )
    }
    if (filter === 'Completed'){
        tasksForTodo = tasks.filter( t => !t.isDone )
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
      setTasks(tasks.map( t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    return <div className='App'>
        <ToDo title={'What to learn'}
              tasks={tasksForTodo}
              removeTasks={removeTasks}
              changeFiler={changeFiler}
              addTask={addTask}
              changeStatus={changeStatus}
              filter={filter}

        />
</div>
}

export default App;
