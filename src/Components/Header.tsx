import React, {ChangeEvent, useState} from 'react';

type HeaderType = {
    title: string
    addTask: (title: string) => void
}

export function Header(props: HeaderType) {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = () => {
        if(newTitle !== ''){
            props.addTask(newTitle.trim())
            setNewTitle('')
        }else{
            setError('Input is not empty')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)

    }

    return <div>
        <h3>{props.title}</h3>
        <input
            className={error ? 'error' : ''}
            value={newTitle}
            onChange={onChangeHandler}
            onKeyPress={(e) => {
                if (e.charCode === 13) {
                    onClickHandler()
                }
            }}

        />
        <button onClick={onClickHandler}>+</button>
        {error && <div className='error-message'>{error}</div>}


    </div>;
};
