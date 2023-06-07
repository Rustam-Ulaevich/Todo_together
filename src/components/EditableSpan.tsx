import {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {

    let [newTitle, setNewTitle] = useState('')
    let [status, setStatus] = useState(true)

    const onActiveInput = () => {
        setStatus(false)
        setNewTitle(props.title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onActiveSpan = () => {
        setStatus(true)
        props.changeTitle(newTitle)
    }

    return status
            ? <span onDoubleClick={onActiveInput}>{props.title}</span>
            : <TextField value={newTitle}
                     onChange={onChangeTitle}
                     onBlur={onActiveSpan}
                     autoFocus
            />
}
