import React, { ChangeEvent, useState } from "react";
import { TaskType } from "./App"

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string, taskId: string) => void
    addTask: (title: string, id: string) => void
}

export const Todolist = (props: PropsType) => {

    let [newTitle, setNewTitle] = useState('')

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>){
        setNewTitle(event.currentTarget.value)
    }

    function onClickHandler(){
        props.addTask(newTitle, props.id)
    }




    return <div>
        <h3>{props.title}</h3>
        <button>x</button>
        <div>
            <input value={newTitle} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        
        <ul>
            {props.tasks.map( t => (
                <li>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {props.deleteTask(props.id, t.id)}}>x</button>
                </li>
            ))}
        </ul>

    </div>
}