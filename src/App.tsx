import './App.css'
import React, { useState } from "react";
import { Todolist } from './Todolist';
import { v1 } from 'uuid'


type TodolistType = {
    id: string
    title: string
    filter: FilterType
} 
type FilterType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'active'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', isDone: false}
        ],
    })

    function deleteTask(id: string, taskId: string){
        tasks[id]  = tasks[id].filter( t => t.id !== taskId)
        setTasks({...tasks})
    }
    
    function addTask(title: string, id: string){
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[id] = [newTask, ...tasks[id]]
        setTasks({...setTasks})
    }
    
    return  <div className='App'>
        {todolists.map( tl => {
            let tasksForTodolist = tasks[tl.id]
        
        return <Todolist key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        deleteTask={deleteTask}
                        addTask={addTask}

        />
        }
        )}
        
    </div>

}
export default App;

