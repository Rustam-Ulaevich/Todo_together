import {FilterValueType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string)=>void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
    onChangeTaskStatus: (id: string, checked: boolean) => void
    filter: FilterValueType
}

export const Todolist = (props: PropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const onClickAddTask = () => {
        if(newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim());
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
    const onAllClickHandler = () => {
        props.changeFilter("All");

    }
    const onActiveClickHandler = () => {props.changeFilter("Active")}
    const onCompletedClickHandler = () => {props.changeFilter("Completed")}

    return <div>
        <h3>{props.title}</h3>
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
                        props.removeTasks(t.id)
                    }
                    const onClickInput = (e: ChangeEvent<HTMLInputElement>) => {
                        props.onChangeTaskStatus(t.id, e.currentTarget.checked)
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
