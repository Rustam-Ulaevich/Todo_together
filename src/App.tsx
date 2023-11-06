import './App.css'
import React, { useState } from "react";
import { Todolist } from './Todolist';
import { v1 } from 'uuid'


type TodolistType = {
    id: string
    title: string
    filter: FilterType
} 
export type FilterType = 'all' | 'active' | 'completed'
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
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
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
    function addTask(id: string, title: string){
        console.log(title)
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[id] = [newTask, ...tasks[id]]
        setTasks({...tasks})
    }
    function changeFilter(id: string, value: FilterType){
        let todolist = todolists.find(tl => tl.id === id)
        if(todolist){
            todolist.filter = value
            setTodolist([...todolists])
        }        
    }
    function changeStatus(id: string, taskId: string, value: boolean){
        
        let task = tasks[id].find( t => t.id === taskId)
        if(task){
            console.log(value)
            task.isDone = value
            setTasks({...tasks})
        }
        
    }
    
    return  <div className='App'>
        {todolists.map( tl => {
            let tasksForTodolist = tasks[tl.id]
            if(tl.filter === 'active'){
                tasksForTodolist = tasksForTodolist.filter(t=>!t.isDone)
            }
            if(tl.filter === 'completed'){
                tasksForTodolist = tasksForTodolist.filter(t=>t.isDone)
            }
        
        return <Todolist key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        deleteTask={deleteTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
        />
        }
        )}
        
    </div>

}
export default App;

