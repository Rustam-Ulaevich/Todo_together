import React, {ChangeEvent, FC, useState} from "react";
import {ValueFilterType} from "./App";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    filterTasks: (value: ValueFilterType) => void
    changeStatusTask: (id: string, value: boolean) => void
}

export const Todolist: FC<TodolistType> = ({title, tasks, removeTask, addTask, filterTasks, changeStatusTask}) => {

    let [newTitle, newTitleSet] = useState('')
    let [error, setError] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => newTitleSet( event.currentTarget.value )
    const onClickHandler = () => {
        addTask(newTitle)
        newTitleSet('')
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input type='text'
                   value={newTitle}
                   onChange={onChangeHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {tasks.map( t => <li>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(event) => {
                           changeStatusTask(t.id, event.currentTarget.checked);

                       }}
                />
                <span>{t.title}</span>
                <button onClick={()=>{removeTask(t.id)}}>x</button>
            </li>)}
        </ul>
        <div>
            <button onClick={ ()=>{filterTasks('All')} }>All</button>
            <button onClick={ ()=>{filterTasks('Active')} }>Active</button>
            <button onClick={ ()=>{filterTasks('Completed')} }>Completed</button>
        </div>
    </div>;
}
