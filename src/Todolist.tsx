import {ValueFilterType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

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
    filter: ValueFilterType
}

export function Todolist(props: PropsType) {

    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setError('')
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            props.addTasks(newTitle)
            setNewTitle('')
        }}
    const addTask = () => {
        if(newTitle.trim() !== '')
        {props.addTasks(newTitle.trim())
        setNewTitle('')}
        else{
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => {props.changeFilter('All')}
    const onActiveClickHandler = () => {props.changeFilter('Active')}
    const onCompletedClickHandler = () => {props.changeFilter('Completed')}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
        </div>
        <div className={error ? 'error-message' : ''}>{error}</div>
        <ul>
            {
                props.tasks.map( (t) => {

                const onClickHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(t.id, e.currentTarget.checked)}

                    return <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onClickHandler}
                />
                <span>{t.title}</span>
                <button onClick={() => {props.removeTasks(t.id)}}>x</button>
            </li>})}
        </ul>
        <div>
            <button className={props.filter == 'All' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter == 'Active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter == 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>;
}
