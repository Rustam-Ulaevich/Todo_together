import React from 'react';

type TasksType = {
    tasks: Array<object>
}

export function Tasks(props: TasksType) {
    return (<div>
        <ul>
            {props.tasks}
        </ul>
    </div>);
};
