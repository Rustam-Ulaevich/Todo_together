import './App.css'
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValueType = 'All' | 'Active' | 'Completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksType = {
    [key: string]: Array<TasksType>
}

const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodollists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Board', isDone: false},
        ]
    })

    const removeTodolist = (idTodolist: string) => {
        todolists = todolists.filter( tl => tl.id !== idTodolist)
        setTodollists([...todolists])
        delete tasks[idTodolist]
        setTasks({...tasks})
    }

    const removeTask = (idTask: string, idTodolist: string) => {
        let todolistTasks = tasks[idTodolist]
        tasks[idTodolist] = todolistTasks.filter(t => t.id != idTask)
        setTasks({...tasks})
    }
    const changeFilter = (value: FilterValueType, idTodolist: string) => {
        let todolist = todolists.find( tl => tl.id === idTodolist)
        if(todolist){
            todolist.filter = value
            setTodollists([...todolists])
        }
    }
    const addTask = (newTaskTitle: string, idTodolist: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        tasks[idTodolist] = [newTask, ...tasks[idTodolist]]
        setTodollists([...todolists])
    }
    const onChangeTaskStatus = (idTask: string, value: boolean, idTodolist: string) => {
        //let todolist = todolists.find( tl => tl.id === idTodolist)
        let resultTask = tasks[idTodolist].find( t => t.id === idTask)
        if(resultTask){
            resultTask.isDone = value
            setTodollists([...todolists])
        }

    }

    return <div className='App'>
        {todolists.map( tl => {
            let tasksForTodolist = tasks[tl.id]

            if( tl.filter === "Active"){
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
            }
            if( tl.filter === "Completed"){
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
            }

            return (
                <Todolist key={tl.id}
                          id={tl.id}
                          title = {tl.title}
                          tasks = {tasksForTodolist}
                          removeTasks = {removeTask}
                          changeFilter = {changeFilter}
                          addTask = {addTask}
                          onChangeTaskStatus = {onChangeTaskStatus}
                          filter={tl.filter}
                          removeTodolist={removeTodolist}/>
            )
        })
        }

    </div>


}

export default App
