import './App.css'
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValueType = 'All' | 'Active' | 'Completed'

const App = () => {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: false},
        ]
    )
    let [filter, setFilter] = useState<FilterValueType>("All")

    const removeTask = (idTask: string) => {
        let resultsTasks = tasks.filter(
            t => t.id != idTask
        )
        setTasks(resultsTasks)
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }
    const addTask = (newTaskTitle: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const onChangeTaskStatus = (idTask: string, value: boolean) => {
        let resultTask = tasks.find( t => t.id === idTask)
        if(resultTask){
            resultTask.isDone = value
            setTasks([...tasks])
        }

    }

    let tasksForTodolist = tasks

    if( filter === "Active"){
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if( filter === "Completed"){
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return <div className='App'>
        <Todolist title = {'What to learn'}
                  tasks = {tasksForTodolist}
                  removeTasks = {removeTask}
                  changeFilter = {changeFilter}
                  addTask = {addTask}
                  onChangeTaskStatus = {onChangeTaskStatus}
                  filter={filter}
        />
    </div>
}

export default App
