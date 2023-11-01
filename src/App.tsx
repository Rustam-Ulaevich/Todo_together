import './App.css'
import React, {useState} from "react";
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

type FilterValueType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to bye', filter: 'all'},
    ])
    let[tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JavaScript', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Book', isDone: false},
        ]
    })

    function addTask(newTitle: string, todolistId: string){
        tasks[todolistId] = [
            {id: v1(), title: newTitle, isDone: false}, ...tasks[todolistId]
        ]
        setTasks({...tasks})
    }

    function deleteTask(id: string, todolistId: string) {

        let filteredTasks = tasks[todolistId]

        tasks[todolistId] = filteredTasks.filter( t => t.id !== id)
        setTasks({...tasks})
    }

    return  <div className='App'>{
            todolists.map((tl) =><Todolist key={tl.id}
                          title={tl.title}
                          id={tl.id}
                          tasks={tasks[tl.id]}
                          addTask={addTask}
                          deleteTask={deleteTask}
            />)
        }

    </div>

}
export default App;

