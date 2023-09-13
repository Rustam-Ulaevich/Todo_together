import './App.css'
import React, {useState} from "react";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterValueType = 'all' | 'active' | 'completed'

const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "what to learn", filter: 'all'},
        {id: todolistId2, title: "what to buy", filter: 'active'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'js', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ],
    })

    function removeTask(id: string, todolistId: string){
        tasks[todolistId] = tasks[todolistId].filter( t => t.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string){
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    function changeStatus(value: boolean, id: string, todolistId: string){
        let task = tasks[todolistId].find( t => t.id === id)
        if(task){
            task.isDone = value
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValueType, todolistId: string){
        let todolist = todolists.find( t => t.id === todolistId)
        if(todolist){
            todolist.filter = value
            setTodolist([...todolists])
        }
    }


    return <div className='App'>
        <div>
            <input type={'text'}/>
            <button>+</button>
        </div>

      {todolists.map( t => {
          let filteredTasks = tasks[t.id]
          if( t.filter === 'active'){
              filteredTasks = filteredTasks.filter(t=> !t.isDone)
          }
          if( t.filter === 'completed'){
              filteredTasks = filteredTasks.filter(t=> t.isDone)
          }

          return <Todolist id={t.id}
                           title={t.title}
                           task={filteredTasks}
                           removeTask={removeTask}
                           addTask={addTask}
                           changeStatus={changeStatus}
                           filter={t.filter}
                           changeFilter={changeFilter}
          />
      })
      }


    </div>
}
export default App;

