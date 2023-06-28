import './App.css'
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, changeFilterTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
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
