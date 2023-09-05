import React, {ChangeEvent, useState, KeyboardEvent} from "react";
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
    changeStatus: (value: boolean, id: string) => void
    filter: valueFilterType
}

export const Todolilst =(props: PropsType) => {

    let [newValueTitle, setNewValueTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    function addTaskInTodolist() {
        if(newValueTitle.trim() !== ''){
            props.addTask(newValueTitle.trim())
            setNewValueTitle('')
        }else{ setError('Заполни форму!!!')}

    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewValueTitle(e.currentTarget.value)
    }
    function onClickHandler() {addTaskInTodolist()}
    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if(e.ctrlKey && e.charCode === 13){
            addTaskInTodolist()
        }
    }

    function allOnClickHandler() {props.changeFilter('all')}
    function activeOnClickHandler() {props.changeFilter('active')}
    function completedOnClickHandler() {props.changeFilter('completed')}



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={ error ? 'error' : ''}
                   value={newValueTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                //autoFocus={setError(false)}
            />
            <button onClick={onClickHandler}>+</button>
            { error ? <div className={'error-message'}>{error}</div> : null }
        </div>
        <ul>
            {
                props.tasks.map( t => {
                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone} onChange={ (e) => {
                            props.changeStatus(e.currentTarget.checked, t.id)
                            console.log(e.currentTarget.checked)
                        }}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={ props.filter == "all" ? 'active-filter' : 'is-done'}
                    onClick={allOnClickHandler}>All</button>
            <button className={ props.filter == "active" ? 'active-filter' : 'is-done'}
                    onClick={activeOnClickHandler}>Active</button>
            <button className={ props.filter == "completed" ? 'active-filter' : 'is-done'}
                    onClick={completedOnClickHandler}>Completed</button>
        </div>
    </div>
}
