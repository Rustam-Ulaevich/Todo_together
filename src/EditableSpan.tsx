import {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditeMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>('')

    function editModeClick(){
        setEditeMode(true)
        setTitle(props.title)
    }

    function editModeView(){
        setEditeMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title}
                 onChange={ onChangeTitleHandler }
                 onBlur={editModeView}
                 autoFocus/>
        : <span onDoubleClick={editModeClick}>{props.title}</span>



}
