import './App.css'
import {FilterValueType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (idTask: string, idTodolist: string) => void
    changeFilter: (value: FilterValueType, idTodolist: string) => void
    addTask: (newTaskTitle: string, idTodolist: string) => void
    changeTaskStatus: (id: string, checked: boolean, idTodolist: string) => void
    changeTaskTitle: (id: string, newTitle: string, idTodolist: string) => void
    filter: FilterValueType
    removeTodolist: (idTodolist: string) => void
    renameTodolist: (newTitle: string, idTodolist: string) => void
}

export const Todolist = (props: PropsType) => {

    const onClickDeleteTodolist = () => props.removeTodolist(props.id);
    const onChangeTitleTodolist = (newTitle: string) => {
        props.renameTodolist(newTitle, props.id)
    }


    const onClickAddTask = (title: string) => props.addTask(title, props.id);

    const onAllClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id);

    return <div>
        <h3>
            <EditableSpan title={props.title}
                          changeTitle={onChangeTitleTodolist}/>
            <button onClick={onClickDeleteTodolist}> ✖</button>
        </h3>


        <AddItemForm addItem={onClickAddTask}/>

        <div>
            <ul>
                {props.tasks.map( (t) => {

                    const onClickButton = () => {
                        props.removeTasks(t.id, props.id)
                    }
                    const onClickInput = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleTask = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }

                    return (
                        <li className={ t.isDone ? 'is-done' : ''}
                            key={t.id}>
                            <input type={"checkbox"}
                                   onChange={onClickInput}
                                   checked={t.isDone}
                            />
                            {/*<span>{t.title} </span>*/}
                            <EditableSpan title={t.title}
                                          changeTitle={onChangeTitleTask}/>
                            <button onClick={onClickButton}> ✖</button>
                        </li>
                    )})
                }
            </ul>
        </div>
        <div>
            <button className={props.filter === 'All' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'Active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>;
}


