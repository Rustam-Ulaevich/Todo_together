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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)


    const removeTodolist = (idTodolist: string) => {
        dispatch(removeTodolistAC(idTodolist))
    }
    const addTodolist = (value: string) => {
        const action = addTodolistAC(value)
        dispatch(action)
    }
    const renameTodolist = (newTitle: string, id: string) => {
        dispatch(renameTodolistAC(id, newTitle))
    }
    const changeFilter = (value: FilterValueType, idTodolist: string) => {
        dispatch(changeFilterTodolistAC(idTodolist, value))
    }

    const removeTask = (idTask: string, idTodolist: string) => {
        dispatch(removeTaskAC(idTask, idTodolist))
    }
    const addTask = (newTaskTitle: string, idTodolist: string) => {
        dispatch(addTaskAC(newTaskTitle, idTodolist))
    }
    const changeTaskStatus = (idTask: string, value: boolean, idTodolist: string) => {
        dispatch(changeStatusTaskAC(idTask, idTodolist, value))
    }
    const changeTaskTitle = (idTask: string, newTitle: string, idTodolist: string) => {
        dispatch(renameTaskAC(idTask, idTodolist, newTitle))
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

export default AppWithRedux
