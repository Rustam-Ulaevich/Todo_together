import {ChangeEvent, useState} from "react";

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
            : <input value={newTitle}
                     onChange={onChangeTitle}
                     onBlur={onActiveSpan}
                     autoFocus
            />
}
