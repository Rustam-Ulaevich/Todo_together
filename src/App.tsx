import './App.css'
import React, {useState} from "react";
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "All"},
        {id: todolistId2, title: 'What to buy', filter: "All"},
        ])
    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Fresh', isDone: false},
            {id: v1(), title: 'Class', isDone: false},
        ],
    })

    function removeTask(idTask: string, id: string) {
        tasks[id] = tasks[id].filter( t => t.id !== idTask)
        setTasks({...tasks})
    }

    function addTask(title: string, id: string) {
        tasks[id] = [{id: v1(), title: title, isDone: false}, ...tasks[id]]
        setTasks({...tasks})
    }

    return <div className='App'>
        {todolist.map( tl => {
            let taskForTodolist = tasks[tl.id]
            if(tl.filter === "Active"){
                taskForTodolist = taskForTodolist.filter( t => !t.id)
            }
            if(tl.filter === "Completed"){
                taskForTodolist = taskForTodolist.filter( t => t.id)
            }
                return <Todolist key={tl.id}
                                 id={tl.id}
                                 tasks={taskForTodolist}
                                 removeTask={removeTask}
                                 addTask={addTask}
                />
            })
        }


    </div>
}
export default App;

