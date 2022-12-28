import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type ValueFilterType = 'All' | 'Active' | 'Completed'



const App = () => {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Beer', isDone: false},
        {id: v1(), title: 'Meat', isDone: true},
        {id: v1(), title: 'Board', isDone: false},
    ])
    let [filter, setFilter] = useState<ValueFilterType>("All")

    function addTask(title: string){
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        setTasks(tasks.filter( t => t.id !== id))
    }

    function filterTasks(value: ValueFilterType) {
        setFilter(value)
    }

    function changeStatusTask(id: string, value: boolean) {
        let findTask = tasks.find( t => t.id === id)
        if(findTask){
            findTask.isDone = value
        }
        setTasks([...tasks])
    }

    let filteredTasks = tasks

    if( filter === "Active" ){
        filteredTasks = filteredTasks.filter( t => !t.isDone)
    }
    if( filter === "Completed" ){
        filteredTasks = filteredTasks.filter( t => t.isDone)
    }

    return <div className='App'>
        <Todolist title='What to buy'
                  tasks = {filteredTasks}
                  removeTask = {removeTask}
                  addTask = {addTask}
                  filterTasks = {filterTasks}
                  changeStatusTask = { changeStatusTask }
        />

    </div>
}

export default App
