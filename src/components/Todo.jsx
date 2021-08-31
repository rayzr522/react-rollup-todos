import React from 'react'
import classes from './Todo.module.css'
import clsx from 'clsx'

export const Todo = ({ todo, setTodoState }) => (
    <div className={clsx([classes.todo, todo.completed && classes.completed])}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => setTodoState(e.target.checked)}
        />
        <span>{todo.title}</span>
    </div>
)
