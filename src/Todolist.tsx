import React, {ChangeEvent, useState} from "react";
import {valueFilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (newTitle: string) => void
    changeFilter: (value: valueFilterType) => void
}

export const Todolilst =(props: PropsType) => {

    let [newValueTitle, setNewValueTitle] = useState('')

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewValueTitle(e.currentTarget.value)
    }

    function onClickHandler() {
        props.addTask(newValueTitle)
        setNewValueTitle('')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input  type={newValueTitle}
                   onChange={ onChangeHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map( t => <li key={t.id}>
                    <input type={"checkbox"} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => {props.removeTask(t.id)}}>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}
