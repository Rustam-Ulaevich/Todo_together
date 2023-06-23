import './App.css'
import {TaskType, Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, changeFilterTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, renameTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

const AppWithReducers = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])
    let [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
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
        dispatchTodolistsReducer(removeTodolistAC(idTodolist))
        dispatchTasksReducer(removeTodolistAC(idTodolist))
    }
    const addTodolist = (value: string) => {
        const id = v1()
        dispatchTodolistsReducer(addTodolistAC(value, todolistId: id))
        dispatchTasksReducer(addTodolistAC(value, todolistId: id)))
    }
    const renameTodolist = (newTitle: string, id: string) => {
        dispatchTodolistsReducer(renameTodolistAC(id, newTitle))
    }
    const changeFilter = (value: FilterValueType, idTodolist: string) => {
        dispatchTodolistsReducer(changeFilterTodolistAC(idTodolist, value))
    }

    const removeTask = (idTask: string, idTodolist: string) => {
        dispatchTasksReducer(removeTaskAC(idTask, idTodolist))
    }
    const addTask = (newTaskTitle: string, idTodolist: string) => {
        dispatchTasksReducer(addTaskAC(newTaskTitle, idTodolist))
    }
    const changeTaskStatus = (idTask: string, value: boolean, idTodolist: string) => {
        dispatchTasksReducer(changeStatusTaskAC(idTask, idTodolist, value))
    }
    const changeTaskTitle = (idTask: string, newTitle: string, idTodolist: string) => {
        dispatchTasksReducer(renameTaskAC(idTask, idTodolist, newTitle))
    }

    console.log(tasks, todolists)
    return <div className='App'>

        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu">
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

export default AppWithReducers
