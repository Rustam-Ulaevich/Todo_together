import {FC} from "react";
import {FilterType} from "../App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: number) => void
    changeFilter: (filter: FilterType) => void
}

export const Todolist: FC<PropsType> = ({
    title,
    tasks,
    removeTask,
    changeFilter
    }) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks.map( task => <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={ () => removeTask(task.id)}>x</button>
                </li>)}
        </ul>
        <div>
            <button onClick={()=>changeFilter('all')}>All</button>
            <button onClick={()=>changeFilter('active')}>Active</button>
            <button onClick={()=>changeFilter('completed')}>Completed</button>
        </div>

    </div>

}
