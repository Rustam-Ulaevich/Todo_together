import {ChangeEvent, useState} from "react";
import {EditableSpan} from "./EditableSpan";
import {Button, TextField} from "@material-ui/core";
import {LibraryAdd} from "@material-ui/icons";

type AddItemFormPropsType = {
    addTitle: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [titleTask, setTitleTask] = useState<string>('')
    let [error, setError] = useState< null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        (setTitleTask(e.currentTarget.value))
        setError(null)
    }

    const onClickHandler = () => {
        if (titleTask.trim() === '')
        {setError('404')}
        else {
            props.addTitle(titleTask.trim())
            setTitleTask('')
        }
    }

    return <div>
               <TextField value={titleTask}
               onChange={ onChangeHandler }
               className={ error ? 'error' : ''}
               label="Outlined"
               variant='outlined'
        />
        <Button onClick={ onClickHandler } variant={'contained'} color={'primary'}
                // disabled={titleTask  ? false : true}
        >
            <LibraryAdd />
        </Button>
        <div className={'error-message'}>{error}</div>


    </div>
}

