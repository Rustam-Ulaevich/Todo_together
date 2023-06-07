import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    addItem: (title: string)=>void
}

export const AddItemForm = (props: PropsType) => {

    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === 'Enter'){onClickAddTask()}
    }
    const onClickAddTask = () => {
        if(newTitle.trim() !== ''){
            props.addItem(newTitle.trim());
            setNewTitle('')
        }else{setError('Title is required')}
    }

    return <div>
        <input className={ error ? 'error' : ''}
               value={newTitle}
               onChange={onChangeHandler}
               onKeyPress={(e)=>onKeyPressHandler(e)}
        />
        <button onClick={onClickAddTask}>+</button>
        <div className={'error-message'}>{error}</div>
    </div>
}
