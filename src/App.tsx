import './App.css'
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

const App = () => {

    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([{
        id: todolist1,
        title: 'What to learn',
        filter: "All"
    }, {id: todolist2, title: 'What to bye', filter: "Active"},])

    let [tasks, setTasks] = useState({
        [todolist1]: [{id: v1(), title: 'HTML', isDone: true}, {id: v1(), title: 'CSS', isDone: true}, {
            id: v1(),
            title: 'JavaScript',
            isDone: false
        },], [todolist2]: [{id: v1(), title: 'Beer', isDone: true}, {id: v1(), title: 'CSS', isDone: false},],
    })

    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists])
    }

    function changeTaskStatus(isDone: boolean, todolistId: string, id: string) {
        let task = tasks[todolistId].find(t => t.id === id)
        if (task) {
            task.isDone = !task.isDone
        }
        setTasks({...tasks})
    }

    function changeTaskTitle(newValue: string, todolistId: string, id: string) {
        let task = tasks[todolistId].find(t => t.id === id)
        if (task) {
            task.title = newValue
        }
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), title: title, filter: "All"}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})

    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        tasks[todolistId] = []
        setTasks({...tasks})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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

export default App
