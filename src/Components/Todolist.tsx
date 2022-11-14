import {FC} from "react";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
}

export const Todolist: FC<PropsType> = ({
    title,
    tasks
    }) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>{tasks.map((task, index) => <li key={index}>
            <input type='checkbox' checked={task.isDone}/>
            <span>{task.title}</span>
        </li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>;
}
