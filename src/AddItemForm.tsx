import {ChangeEvent, useState} from "react";
import {EditableSpan} from "./EditableSpan";

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
        if (titleTask.trim() == '')
        {setError('404')}
        else {
            props.addTitle(titleTask.trim())
            setTitleTask('')
        }
    }

    return <div>
        <input value={titleTask}
               onChange={ onChangeHandler }
               className={ error ? 'error' : ''}
        />
        <button onClick={ onClickHandler }
                // disabled={titleTask  ? false : true}
        >+</button>
        <div className={'error-message'}>{error}</div>


    </div>
}

