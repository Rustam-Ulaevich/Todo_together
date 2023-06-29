import './App.css'
import {TaskType, Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, changeFilterTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import React, {useCallback} from "react";

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}


const AppWithRedux = React.memo(() => {

    console.log('App')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists)

    const removeTodolist = useCallback((idTodolist: string) => {
        dispatch(removeTodolistAC(idTodolist))
    }, [dispatch])
    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistAC(value))
    }, [dispatch])
    const renameTodolist = useCallback((newTitle: string, id: string) => {
        dispatch(renameTodolistAC(id, newTitle))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValueType, idTodolist: string) => {
        dispatch(changeFilterTodolistAC(idTodolist, value))
    }, [dispatch])

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
                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <Todolist key={tl.id}
                                    id={tl.id}
                                    title = {tl.title}
                                    changeFilter = {changeFilter}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    renameTodolist = {renameTodolist}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </Container>
    </div>
})

export default AppWithRedux
