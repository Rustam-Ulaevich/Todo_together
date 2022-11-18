import {FC, useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

interface TodolistProps {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export const Todolist: FC<TodolistProps> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }) => {

    const [newTitle, setNewTitle] = useState('')

    const onAddTask = () => {
        addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHsndler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.charCode === 13){
                onAddTask()
            }
        }

    const onRemoveTask = (id: string) => {
        removeTask(id)
    }

    const onHandlerChangeFilter = (value: FilterValueType) => {
        changeFilter(value)
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={newTitle}
                   type="text"
                   onChange={ onChangeHsndler }
                   onKeyPress = { onKeyPress }
            />
            <button  onClick={onAddTask}>+</button>
        </div>
        <ul>
            {tasks.map( (task, index) => <li key={index}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={ () => onRemoveTask(task.id) }>x</button>
            </li>)}
        </ul>
        <div>
            <button onClick={ () => {onHandlerChangeFilter("All")} }>All</button>
            <button onClick={ () => {onHandlerChangeFilter("Active")} }>Active</button>
            <button onClick={ () => {onHandlerChangeFilter("Completed")} }>Completed</button>
        </div>
    </div>;
}
