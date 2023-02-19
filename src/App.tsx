import './App.css'
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const App = () => {

    let [filter, setFilter] = useState<FilterValueType>("All")

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: "All"},
        {id: v1(), title: 'What to bye', filter: "Active"},
    ])

    let todolist1 = v1()
    let todolist2 = v1()

    let [tasks, setTasks] = useState({
        [todolist1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
        ],
        [todolist2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
        ],

    })







    return <div className='App'>

        {todolists.map( (tl) => {

            let tasksForTodolist = tasks[tl.id]

            if(filter === "Active"){
                tasksForTodolist = tasks.tl.filter( t => t.isDone)
            }
            if(filter === "Completed"){
                tasksForTodolist = tasks.tl.filter( t => !t.isDone)
            }

            return <Todolist key={tl.id}
                             title={tl.title}
                             tasks={tasksForTodolist}
            />
        })}


    </div>
}

export default App
