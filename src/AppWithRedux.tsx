import './App.css'
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC, changeTodolistTitleAC,
    changeValueFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
        state => state.todolists
    )
    const tasks = useSelector<AppRootStateType, TasksStateType>(
        state => state.tasks
    )
    const dispatch = useDispatch()


    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        dispatch(changeValueFilterAC(todolistId, value))
    }

    function changeTaskStatus(isDone: boolean, todolistId: string, id: string) {
        dispatch(changeTaskStatusAC(id, todolistId, isDone))
    }

    function changeTaskTitle(newValue: string, todolistId: string, id: string) {
        dispatch(changeTaskTitleAC(id, todolistId, newValue))
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    return <div className='App'>
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton>
                    <Menu color={'action'}/>
                </IconButton>

            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container style={{padding: '10px'}}>
                <AddItemForm addTitle={addTodolist}/>
            </Grid>
            <Grid container spacing={10}>
                {todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id]

                    if (tl.filter === "Active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === "Completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <Todolist key={tl.id}
                                      id={tl.id}
                                      title={tl.title}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      addTask={addTask}
                                      filter={tl.filter}
                                      changeFilter={changeFilter}
                                      changeTaskStatus={changeTaskStatus}
                                      changeTaskTitle={changeTaskTitle}
                                      removeTodolist={removeTodolist}
                                      changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </Container>


    </div>
}

export default AppWithRedux
