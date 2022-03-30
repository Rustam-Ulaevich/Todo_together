import React from 'react';
import {ValueFilterType} from "../App";

export type ButtonsType = {
    changeFiler: (value: ValueFilterType) => void
    filter: ValueFilterType
}

export const Buttons = (props: ButtonsType) => {
    return <div>
        <button
            className={ props.filter === "All" ? 'active-filter' : ''}
            onClick={ () => {props.changeFiler('All')}} > All
        </button>
        <button
            className={ props.filter === "Active" ? 'active-filter' : ''}
            onClick={ () => {props.changeFiler('Active')}}>Active
        </button>
        <button
            className={ props.filter === "Completed" ? 'active-filter' : ''}
            onClick={ () => {props.changeFiler('Completed')}}>Completed
        </button>

        </div>;
};
