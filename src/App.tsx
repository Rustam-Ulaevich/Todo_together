import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import './App.css'

export type ValueFilterType = 'All' | 'Active' | 'Completed'

const App = () => {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
    ])
    let [filter, setFilter] = useState<ValueFilterType>('All')

    function addTasks(title: string) {
        let newTasks = {id: v1(), title: title, isDone: false}
        setTasks([newTasks, ...tasks])
    }

    function removeTasks(id: string) {
        setTasks(tasks.filter( t => t.id !== id))
    }

    function changeFilter(value: ValueFilterType) {
        setFilter(value)
    }

    function changeTaskStatus(id: string, value: boolean) {
        let findTasks = tasks.find( t => t.id == id)
        if(findTasks){
            findTasks.isDone = value
        }
        setTasks([...tasks])
    }

    let filteredTasks = tasks
    if(filter == 'Active'){
        filteredTasks = tasks.filter( t => !t.isDone )
    }
    if(filter == 'Completed'){
        filteredTasks = tasks.filter( t => t.isDone )
    }


    return <div className='App'>
        <Todolist title={'What to learn'}
                  tasks={filteredTasks}
                  removeTasks={removeTasks}
                  changeFilter={changeFilter}
                  addTasks={addTasks}
                  changeTaskStatus={changeTaskStatus}
                  filter={filter}
        />

    </div>
}

export default App
