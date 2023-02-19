import {TaskType} from "./App";

type PropsType = {
    title: string
    tasks: TaskType[]
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input type="text"/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map( t => {
                return <li>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button>x</button>
                </li>
            })}

        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>

    </div>;
}
