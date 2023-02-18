import {ValueFilterType} from "./App";
import {useState} from "react";

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

    return <>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={(e)=>{setNewTitle(e.currentTarget.value)}}
                   onKeyPress={(e) => {
                       if(e.ctrlKey && e.charCode === 13){
                           props.addTasks(newTitle)
                           setNewTitle('')
                   }}}
            />
            <button onClick={() => {

            }}>+</button>
        </div>
        <ul>
            {props.tasks.map( (t) => <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onClick={(e) => { props.changeTaskStatus(t.id, e.currentTarget.checked)}}
                />
                <span>{t.title}</span>
                <button onClick={() => {props.removeTasks(t.id)}}>x</button>
            </li>)}
        </ul>
        <div>
            <button onClick={() => {props.changeFilter('All')}}>All</button>
            <button onClick={() => {props.changeFilter('Active')}}>Active</button>
            <button onClick={() => {props.changeFilter('Completed')}}>Completed</button>
        </div>
    </>;
}
