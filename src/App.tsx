import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

   const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
   const [filter, setFilter] = useState<FilterValueType>('All')

   const addTask = (title: string) => {
     const newTask: TasksType = {id: v1(), title: title, isDone: false}
       setTasks([newTask, ...tasks])
   }

    // const Task2 = useState([
    //     {id: v1(), title: 'Milk', isDone: true},
    //     {id: v1(), title: 'Book', isDone: true},
    //     {id: v1(), title: 'PC', isDone: true},
    // ])

    const removeTask = (id: string) => {
       setTasks(tasks.filter( t => t.id !== id))
    }

    const changeFilter = (value: FilterValueType) => {
      setFilter(value)
    }

    let filteredTasks = tasks
    if(filter === 'Active'){
        filteredTasks = tasks.filter( t => !t.isDone)
    }
    if(filter === 'Completed'){
        filteredTasks = tasks.filter( t => t.isDone)
    }

    return <div className='App'>
        <Todolist title='What to learn'
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
        />
    </div>

}

export default App;
