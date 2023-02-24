import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditeMode] = useState<boolean>(true)
    let [title, setTitle] = useState<string>('')


    function editModeClick(){
        setEditeMode(false)
        setTitle(props.title)
    }

    function editModeView(){
        setEditeMode(true)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    return editMode ?
            <span onDoubleClick={editModeClick}>{props.title}</span> :
            <input value={title}
                   onChange={ onChangeTitleHandler }
                   onBlur={editModeView}
                   autoFocus
            />

}
