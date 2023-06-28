import './App.css'
import {FilterValueType} from "./AppWithRedux";
import {ChangeEvent} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TasksType} from "./AppWithRedux";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, renameTaskAC} from "./state/tasks-reducer";

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

export const Todolist = (props: PropsType) => {
    const dispatch = useDispatch()

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    const onClickDeleteTodolist = () => props.removeTodolist(props.id);
    const onChangeTitleTodolist = (newTitle: string) => {
        props.renameTodolist(newTitle, props.id)
    }

    const onClickAddTask = (title: string) => dispatch(addTaskAC(title, props.id));

    const onAllClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id);

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
            {tasksForTodolist.map( (t) => {

                    const onClickButton = () => dispatch(removeTaskAC(t.id, props.id))

                    const onClickInput = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeStatusTaskAC(t.id, props.id, e.currentTarget.checked))
                    }
                    const onChangeTitleTask = (newTitle: string) => {
                        dispatch(renameTaskAC(t.id, props.id, newTitle))
                    }

                    return (
                        <div className={ t.isDone ? 'is-done' : ''} key={t.id}>
                            <Checkbox onChange={onClickInput}
                                      checked={t.isDone}
                            />
                            <EditableSpan title={t.title}
                                          changeTitle={onChangeTitleTask}/>
                            <IconButton aria-label="delete"
                                        onClick={onClickButton}
                            >
                                <Delete />
                            </IconButton>
                        </div>
                    )})
                }
        </div>
        <div>
            <Button variant = {props.filter === 'All' ? 'contained' : 'text'}
                    //className={props.filter === 'All' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant = {props.filter === 'Active' ? 'contained' : 'text'}
                    //className={props.filter === 'Active' ? 'active-filter' : ''}
                    color = {"primary"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant = {props.filter === 'Completed' ? 'contained' : 'text'}
                    //className={props.filter === 'Completed' ? 'active-filter' : ''}
                    color = {"secondary"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>;
}


