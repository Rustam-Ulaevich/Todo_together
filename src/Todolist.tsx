import {useState} from "react";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    addTask: (newTitle: string, todolistId: string)=>void
    deleteTask: (id: string, todolistId: string)=>void
}


export function Todolist(props: PropsType) {

    let [valueTitle, setValueTitle] = useState('')


    return <div>
        <h1>{props.title}</h1>
        <div>
            <input  type="text" onChange={(event) => setValueTitle(event.currentTarget.value)}/>
            <button onClick={ () => props.addTask(valueTitle, props.id)}>+</button>
        </div>
        <ul>
            {props.tasks.map((t) => <li>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => props.deleteTask(t.id, props.id)}>x</button>
            </li>
            )}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>

    </div>;
}
