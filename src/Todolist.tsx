import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksType, TaskType} from "./App";

type PropsType = {
    id: string
    tasks: Array<TaskType>
    removeTask: (idTask: string, id: string) => void
    addTask: (title: string, id: string) => void
}

export function Todolist(props: PropsType) {

    let [newTitle, setNewTitle] = useState('')

    function addTaskInTodolist() {

        props.addTask(newTitle, props.id)

    }
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
            setNewTitle(e.currentTarget.value)
    }
    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if(e.charCode === 13){addTaskInTodolist()        }
    }
    function onClickHandler() {
        setNewTitle('')
        addTaskInTodolist()
    }

    return <div>
        <h3>Todolist</h3>
        <div>
            <input type="text"
                   value={newTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map( t => <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={()=>props.removeTask(t.id, props.id)}>x</button>
            </li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>;
}
