import {FilterValueType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string ) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValueType
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeTaskStatus: (value: boolean, todolistId: string, id: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    function addTitle(title: string) {
        props.addTask(title, props.id)
    }

    function changeTodolistTitle(newTitle: string) {
        props.changeTodolistTitle(props.id, newTitle)
    }



    return <div>
        <div>
            <h3>{props.title}</h3>
            <button onClick={() => props.removeTodolist(props.id)}>x</button>
        </div>

        <div>
            <AddItemForm addTitle={addTitle} />
        </div>
        <ul>
            {props.tasks.map( t => {

                const onChangeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(e.currentTarget.checked, props.id, t.id)
                }

                return <li className={t.isDone ? 'is-done' : ''}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={ onChangeStatusTaskHandler }/>
                    <EditableSpan title={t.title} onChange={changeTodolistTitle}/>
                    <button onClick={ () => (props.removeTask(t.id, props.id))}>x</button>
                </li>
            })}

        </ul>
        <div>
            <button className={ props.filter === "All" ? 'active-filter' : ''}
                    onClick={ () => (props.changeFilter("All", props.id))}>All</button>
            <button className={ props.filter === "Active" ? 'active-filter' : ''}
                    onClick={ () => (props.changeFilter("Active", props.id))}>Active</button>
            <button className={ props.filter === "Completed" ? 'active-filter' : ''}
                    onClick={ () => (props.changeFilter("Completed", props.id))}>Completed</button>
            <p>{props.filter}</p>
        </div>



    </div>;
}
