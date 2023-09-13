import {FilterValueType, TaskType} from "./App";
import {ChangeEvent, useState} from "react";


type PropsType = {
    id: string
    title: string
    task: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (value: boolean, id: string, todolistId: string) => void
    filter: FilterValueType
    changeFilter:(value: FilterValueType, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState(false)

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTitle(e.currentTarget.value)
    }
    function onClickHandler() {
        if(newTitle !== '' ){
            props.addTask(newTitle, props.id)
            setNewTitle('')
            setError(false)
        }else{setError(true)}
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? 'error' : ''}
                   value={newTitle}
                   onChange={onChangeHandler}
                   type='text'/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {props.task.map( (t) => <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(event)=>{props.changeStatus(event.currentTarget.checked, t.id, props.id)}}
                />
                <span>{t.title}</span>
                <button onClick={()=>props.removeTask(t.id, props.id)}>x</button>
            </li> )}
        </ul>

        <div>
            <button className={props.filter == "all" ? 'active-filter' : 'is-done'}
                    onClick={()=>{props.changeFilter('all', props.id)}}>All</button>
            <button className={props.filter == "active" ? 'active-filter' : 'is-done'}
                    onClick={()=>{props.changeFilter('active', props.id)}}>Active</button>
            <button className={props.filter == "completed" ? 'active-filter' : 'is-done'}
                    onClick={()=>{props.changeFilter('completed', props.id)}}>Completed</button>
        </div>

    </div>;
}
