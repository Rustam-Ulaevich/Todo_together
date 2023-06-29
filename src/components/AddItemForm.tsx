import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string)=>void
}

export const AddItemForm = React.memo((props: PropsType) => {

    console.log('AddItemForm')

    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }, [])
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if(error !== null){
            setError(null)
        }
        if(e.key === 'Enter'){onClickAddTask()}
    }
    const onClickAddTask = () => {
        if(newTitle.trim() !== ''){
            props.addItem(newTitle.trim());
            setNewTitle('')
        }else{setError('Title is required')}
    }

    return <div>
        <TextField label="тута пиши, да"
                   variant="outlined"
                   //color={error ? 'secondary' : 'primary'}
                   //className={ error ? 'error' : ''}
                   value={newTitle}
                   onChange={onChangeHandler}
                   onKeyPress={(e)=>onKeyPressHandler(e)}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={onClickAddTask}
                //variant={"contained"}
                color={"primary"}>
            <ControlPoint />
        </IconButton>
        {/*<div className={'error-message'}>{error}</div>*/}
    </div>
})
