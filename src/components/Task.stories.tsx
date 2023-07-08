import {Task} from "./Task";
import {action} from '@storybook/addon-actions'
import {v1} from "uuid/index";

export default {
    title: 'AddItemForm Component',
    component: Task,
}

const callback = action( "Button 'add' was pressed")

export const TaskBaseExample = (props: any) => {
    return <Task task={{id: v1(), title: 'CSS', isDone: false}}  todolistId={'todolistId1'}/>
}
