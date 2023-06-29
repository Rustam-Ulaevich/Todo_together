import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeStatusTaskAC, removeTaskAC, renameTaskAC} from "../state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickButton = () => dispatch(removeTaskAC(props.task.id, props.todolistId))
    const onClickInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTaskAC(props.task.id, props.todolistId, e.currentTarget.checked))
    }
    const onChangeTitleTask = useCallback((newTitle: string) => {
        dispatch(renameTaskAC(props.task.id, props.todolistId, newTitle))
    }, [dispatch, props.task.id, props.todolistId])

    return (<div className={props.task.isDone ? 'is-done' : ''} key={props.task.id}>
            <Checkbox onChange={onClickInput}
                      checked={props.task.isDone}/>
            <EditableSpan title={props.task.title}
                          changeTitle={onChangeTitleTask}/>
            <IconButton aria-label="delete"
                        onClick={onClickButton}>
                <Delete/>
            </IconButton>
        </div>)
})
