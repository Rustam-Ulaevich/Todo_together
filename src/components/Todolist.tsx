import '../App.css'
import {FilterValueType} from "../AppWithRedux";
import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC} from "../state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValueType, idTodolist: string) => void
    filter: FilterValueType
    removeTodolist: (idTodolist: string) => void
    renameTodolist: (newTitle: string, idTodolist: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    console.log('Todolist')

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    const onClickDeleteTodolist = useCallback(() => props.removeTodolist(props.id), [])
    const onChangeTitleTodolist = useCallback((newTitle: string) => {
        props.renameTodolist(newTitle, props.id)
    }, [props.renameTodolist, props.id])


    const onClickAddTask = useCallback((title: string) => dispatch(addTaskAC(title, props.id)), [dispatch])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("All", props.id)}, [props.changeFilter, props.id]
    )
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("Active", props.id)
        }, [props.changeFilter, props.id]
    )
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("Completed", props.id)
        }, [props.changeFilter, props.id]
    )

    let tasksForTodolist = tasks

    if( props.filter === "Active"){
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }
    if( props.filter === "Completed"){
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={onChangeTitleTodolist}/>
            <IconButton aria-label="delete" onClick={onClickDeleteTodolist}>
                <Delete />
            </IconButton>
        </h3>

        <AddItemForm addItem={onClickAddTask}/>

        <div>
            {tasksForTodolist.map( (t) => <Task
                key={t.id}
                task={t}
                todolistId={props.id}
                />
            )
            }
        </div>
        <div>
            <Button variant = {props.filter === 'All' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant = {props.filter === 'Active' ? 'contained' : 'text'}
                    color = {"primary"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant = {props.filter === 'Completed' ? 'contained' : 'text'}
                    color = {"secondary"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>;
})


