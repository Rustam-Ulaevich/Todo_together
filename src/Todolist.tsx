import {FilterValueType, TaskType} from "./AppWithReducers";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string ) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValueType
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeTaskStatus: (isDone: boolean, todolistId: string, id: string) => void
    changeTaskTitle: (newValue: string, todolistId: string, id: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    function addTitle(title: string) {
        props.addTask(title, props.id)
    }

    function onChangeTodolistTitleHandler(newValue: string) {
        props.changeTodolistTitle(props.id, newValue)
    }

    return <div>
        <div>
            <h3>
                <EditableSpan title={props.title}
                              onChange={onChangeTodolistTitleHandler}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}>
                    <Delete/>
                </IconButton>
            </h3>
            {/*<EditableSpan title={props.title} onChange={props.changeTodolistTitle}/>   ЭТО ИСПРАВИТЬ!!!  */}
        </div>

        <div>
            <AddItemForm addTitle={addTitle} />
        </div>
        <div>
            {props.tasks.map( (t) => {

                const onClickHandler = () => {
                    props.removeTask(t.id, props.id)
                }

                const onChangeStatusTaskHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(e.currentTarget.checked, props.id, t.id)
                }

                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(newValue, props.id, t.id)
                }

                return <div className={t.isDone ? 'is-done' : ''}
                            style={{padding: '10px'}}
                            key={t.id}
                >
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={ onChangeStatusTaskHandler }/>
                    <EditableSpan title={t.title}
                                  onChange={onChangeTitleHandler}/>
                    <IconButton onClick={onClickHandler}>
                        <Delete />
                    </IconButton>
                </div>
            })}

        </div>
        <div>
            <Button variant={ props.filter === "All" ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={ () => (props.changeFilter("All", props.id))}>All</Button>
            <Button variant={ props.filter === "Active" ? 'contained' : 'outlined'}
                    color={'secondary'}
                    onClick={ () => (props.changeFilter("Active", props.id))}>Active</Button>
            <Button variant={ props.filter === "Completed" ? 'contained' : 'outlined'}
                    color={'default'}
                    onClick={ () => (props.changeFilter("Completed", props.id))}>Completed</Button>
        </div>
    </div>;
}

