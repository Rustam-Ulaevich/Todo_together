import {ValueFilterType} from "./App";
import {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id: string)=>void
    changeFilter: (value: ValueFilterType) => void
    addTasks: (title: string) => void
    changeTaskStatus: (id: string, value: boolean) => void
}

export function Todolist(props: PropsType) {

    let [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            props.addTasks(newTitle)
            setNewTitle('')
        }}
    const addTask = () => {
        props.addTasks(newTitle)
        setNewTitle('')}
    const onAllClickHandler = () => {props.changeFilter('All')}
    const onActiveClickHandler = () => {props.changeFilter('Active')}
    const onCompletedClickHandler = () => {props.changeFilter('Completed')}

    return <>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map( (t) => {

                const onClickHandler = (e: MouseEvent<HTMLInputElement>) => { props.changeTaskStatus(t.id, e.currentTarget.checked)}

                    return <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onClick={onClickHandler}
                />
                <span>{t.title}</span>
                <button onClick={() => {props.removeTasks(t.id)}}>x</button>
            </li>})}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </>;
}
