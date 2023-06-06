import {FilterValueType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (idTask: string, idTodolist: string)=>void
    changeFilter: (value: FilterValueType, idTodolist: string) => void
    addTask: (newTaskTitle: string, idTodolist: string) => void
    onChangeTaskStatus: (id: string, checked: boolean, idTodolist: string) => void
    filter: FilterValueType
    removeTodolist: (idTodolist: string)=>void
}

export const Todolist = (props: PropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onClickDeleteTodolist = () => {props.removeTodolist(props.id)}
    const onClickAddTask = () => {
        if(newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('')
        }else{setError('Title is required')}

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        //setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === 'Enter'){onClickAddTask()}
    }
    const onAllClickHandler = () => {props.changeFilter("All", props.id);}
    const onActiveClickHandler = () => {props.changeFilter("Active", props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("Completed", props.id)}

    return <div>
        <h3>{props.title}</h3>
        <button onClick={onClickDeleteTodolist}> ✖</button>
        <div>
            <input className={ error ? 'error' : ''}
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={(e)=>onKeyPressHandler(e)}
            />
            <button onClick={onClickAddTask}>+</button>
            <div className={'error-message'}>{error}</div>
        </div>
        <div>
            <ul>
                {props.tasks.map( (t) => {

                    const onClickButton = () => {
                        props.removeTasks(t.id, props.id)
                    }
                    const onClickInput = (e: ChangeEvent<HTMLInputElement>) => {
                        props.onChangeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    return (
                        <li key={t.id}>
                            <input type={"checkbox"}
                                   onChange={onClickInput}
                                   checked={t.isDone}
                            />
                            <span>{t.title} </span>
                            <button onClick={onClickButton}> ✖</button>
                        </li>
                    )})
                }
            </ul>
        </div>
        <div>
            <button className={props.filter === 'All' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'Active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>;
}
