import React, { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "./App"

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string, taskId: string) => void
    addTask: (id: string, title: string) => void
    changeFilter: (id: string, value: FilterType) => void
    changeStatus: (id: string, taskId: string, value: boolean) => void
}

export const Todolist = (props: PropsType) => {

    let [newTitle, setNewTitle] = useState('')

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>){
        setNewTitle(event.currentTarget.value)
    }

    function onClickHandler(){
        setNewTitle('')
        props.addTask(props.id, newTitle)

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
                    <input type="checkbox" 
                                checked={t.isDone}
                                onClick={event=>(
                                    props.changeStatus(props.id, t.id, event.currentTarget.checked))}
                                />
                    <span>{t.title}</span>
                    <button onClick={() => {props.deleteTask(props.id, t.id)}}>x</button>
                </li>
            ))}
        </ul>

        <div>
            <button onClick={()=>{props.changeFilter(props.id, 'all')}}>All</button>
            <button onClick={()=>{props.changeFilter(props.id, 'active')}}>Active</button>
            <button onClick={()=>{props.changeFilter(props.id, 'completed')}}>Completed</button>
        </div>

    </div>
}