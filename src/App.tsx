import './App.css'
import {TaskType, Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])
    let [tasks, setTasks] = useState<TasksType>({
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
        setTodolists([...todolists])
        delete tasks[idTodolist]
        setTasks({...tasks})
    }
    const addTodolist = (value: string) => {
        let idTodolist = v1()
        let newTodolist: TodolistType = {id: idTodolist, title: value, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [idTodolist]: []})
    }
    const renameTodolist = (newTitle: string, id: string) => {
        let todolist = todolists.find( tl => tl.id === id)
        if(todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }

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
            setTodolists([...todolists])
        }
    }
    const addTask = (newTaskTitle: string, idTodolist: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        tasks[idTodolist] = [newTask, ...tasks[idTodolist]]
        setTodolists([...todolists])
    }
    const changeTaskStatus = (idTask: string, value: boolean, idTodolist: string) => {
        let resultTask = tasks[idTodolist].find( t => t.id === idTask)
        if(resultTask){
            resultTask.isDone = value
            setTodolists([...todolists])
        }

    }
    const changeTaskTitle = (idTask: string, newTitle: string, idTodolist: string) => {
        let task = tasks[idTodolist].find(t => t.id === idTask)
        if(task){
            task.title = newTitle
            setTasks({...tasks})
        }

    }

    return <div className='App'>

        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"

                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" >
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>

        <Container fixed>
            <Grid container style={{padding: '10px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map( tl => {
                    let tasksForTodolist = tasks[tl.id]

                    if( tl.filter === "Active"){
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    if( tl.filter === "Completed"){
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }

                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <Todolist key={tl.id}
                                    id={tl.id}
                                    title = {tl.title}
                                    tasks = {tasksForTodolist}
                                    removeTasks = {removeTask}
                                    changeFilter = {changeFilter}
                                    addTask = {addTask}
                                    changeTaskStatus = {changeTaskStatus}
                                    changeTaskTitle = {changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    renameTodolist = {renameTodolist}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>




        </Container>



    </div>


}

export default App
