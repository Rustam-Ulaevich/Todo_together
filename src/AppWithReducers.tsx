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

const AppWithReducers = () => {


    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, dispatchtoTodolists] = useReducer( todolistsReducer, [
        {id: todolist1, title: 'What to learn', filter: "All"},
        {id: todolist2, title: 'What to bye', filter: "Active"},
    ])

    let [tasks, dispatchToTasks] = useReducer( tasksReducer,{
        [todolist1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},],
    })

    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        dispatchtoTodolists(changeValueFilterAC(todolistId, value))
    }

    function changeTaskStatus(isDone: boolean, todolistId: string, id: string) {
        dispatchToTasks(changeTaskStatusAC(id, todolistId, isDone))
    }

    function changeTaskTitle(newValue: string, todolistId: string, id: string) {
        dispatchToTasks(changeTaskTitleAC(id, todolistId, newValue))
    }

    function addTodolist(title: string) {
        dispatchtoTodolists(addTodolistAC(title))
        dispatchToTasks(addTodolistAC(title))
    }

    function removeTodolist(todolistId: string) {
        dispatchtoTodolists(removeTodolistAC(todolistId))
        dispatchToTasks(removeTodolistAC(todolistId))
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatchtoTodolists(changeTodolistTitleAC(todolistId, newTitle))
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

export default AppWithReducers
