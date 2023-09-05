import './App.css'
import React, {useState} from "react";
import {TaskType, Todolilst} from "./Todolist";
import {v1} from 'uuid';

export type valueFilterType = 'all' | 'completed' | 'active'

const App = () => {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])
    let [filter, setFilter] = useState<valueFilterType>("all")

    function removeTask(id: string) {
        let resultTask = tasks.filter( t => t.id !== id)
        setTasks(resultTask)
    }

    function addTask(newTitle: string) {
        let newTask: TaskType = {id: v1(), title: newTitle, isDone: false }
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: valueFilterType) {
        setFilter(value)
    }

    let resultTasks = tasks
    if(filter == "completed"){
        resultTasks = tasks.filter( t => t.isDone )
    }
    if(filter == "active"){
        resultTasks = tasks.filter( t => !t.isDone )
    }

    return <div className='App'>
        <Todolilst title={'Todolist'}
                   tasks={resultTasks}
                   removeTask={removeTask}
                   addTask={addTask}
                   changeFilter={changeFilter}
        />

    </div>
}

export default App

