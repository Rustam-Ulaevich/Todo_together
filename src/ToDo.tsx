import {Header} from "./Components/Header";
import {Tasks} from "./Components/Tasks";
import {Buttons} from "./Components/Buttons";
import {TasksType, ValueFilterType} from "./App";
import {ChangeEvent, useState} from "react";

type ToDoType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string) => void
    changeFiler: (value: ValueFilterType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: ValueFilterType
}

export function ToDo(props: ToDoType) {

    const [checkBox, setCheckBox] = useState<boolean>(false)

    const resultTasks = props.tasks.map( t => {

        return (
            <li key={t.id}
                className={t.isDone ? 'is-done' : ''}
            >
                <input
                    type="checkbox"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked)

                    }
                    checked={t.isDone}
                />
                <span>{t.title}</span>
                <button onClick={ () => {props.removeTasks(t.id)}}>x</button>
            </li>
            )

    })

    return <div>
        <Header title={props.title}
                addTask={props.addTask}

        />
        <Tasks tasks={resultTasks}/>
        <Buttons
            changeFiler={props.changeFiler}
            filter={props.filter}
        />
    </div>
}
