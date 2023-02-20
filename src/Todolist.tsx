import {FilterValueType, TaskType} from "./App";
import {ChangeEvent, useState} from "react";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string ) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValueType
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeTaskStatus: (value: boolean, todolistId: string)
}

export function Todolist(props: PropsType) {

    let [titleTask, setTitleTask] = useState<string>('')
    let [error, setError] = useState< null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        (setTitleTask(e.currentTarget.value))
        setError(null)
    }

    const onClickHandler = () => {

        if (titleTask.trim() == '')
        {
            setError('404')
        }else {
            props.addTask(titleTask.trim(), props.id)
            setTitleTask('')
        }
    }

    return <div>
        <div>
            <h3>{props.title}</h3>
            <button>x</button>
        </div>

        <div>
            <input value={titleTask}
                   onChange={ onChangeHandler }
                   className={ error ? 'error' : ''}
            />
            <button onClick={ onClickHandler }>+</button>
            <div className={'error-message'}>{error}</div>
        </div>
        <ul>
            {props.tasks.map( t => {
                return <li>
                    <input type="checkbox" checked={t.isDone} onChange={ e => e.currentTarget.checked}/>
                    <span>{t.title}</span>
                    <button onClick={ () => (props.removeTask(t.id, props.id))}>x</button>
                </li>
            })}

        </ul>
        <div>
            <button onClick={ () => (props.changeFilter("All", props.id))}>All</button>
            <button onClick={ () => (props.changeFilter("Active", props.id))}>Active</button>
            <button onClick={ () => (props.changeFilter("Completed", props.id))}>Completed</button>
        </div>

    </div>;
}
