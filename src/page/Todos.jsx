import React, { useEffect, useMemo, useState } from 'react'
import { Todo } from '../components/Todo'
import classes from './Todos.module.css'

export const Todos = () => {
    const [todos, setTodos] = useState([])
    const [userIdFilter, setUserIdFilter] = useState(-1)

    const userIds = useMemo(
        () =>
            todos.reduce(
                (acc, next) =>
                    acc.includes(next.userId) ? acc : acc.concat(next.userId),
                []
            ),
        [todos]
    )
    const filteredTodos = useMemo(
        () =>
            userIdFilter < 0
                ? todos
                : todos.filter((todo) => todo.userId === userIdFilter),
        [todos, userIdFilter]
    )

    useEffect(() => {
        const existingTodos = localStorage.getItem('todos')
        if (!existingTodos) {
            fetchTodos()
        } else {
            setTodos(JSON.parse(existingTodos))
        }
    }, [])
    useEffect(
        () => localStorage.setItem('todos', JSON.stringify(todos)),
        [todos]
    )
    useEffect(() => {
        if (userIdFilter > -1 && !userIds.includes(userIdFilter)) {
            setUserIdFilter(-1)
        }
    }, [userIds, userIdFilter])

    const fetchTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data))
    }
    const clearVisible = () => {
        setTodos(todos.filter((todo) => !filteredTodos.includes(todo)))
    }
    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed))
    }

    return (
        <div className={classes.root}>
            <div className={classes.controls}>
                <select
                    value={userIdFilter}
                    onChange={(e) =>
                        setUserIdFilter(parseInt(e.target.value, 10))
                    }
                    className={classes.userIdFilter}
                >
                    <option value={-1}>All users</option>
                    {userIds.map((userId) => (
                        <option key={userId} value={userId}>
                            {userId}
                        </option>
                    ))}
                </select>
                <button className={classes.button} onClick={fetchTodos}>
                    Fetch
                </button>
                <button className={classes.button} onClick={clearVisible}>
                    Clear Visible
                </button>
                <button className={classes.button} onClick={clearCompleted}>
                    Clear Completed
                </button>
            </div>
            <div className={classes.todos}>
                {filteredTodos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        setTodoState={(state) => {
                            const newTodos = todos.map((existingTodo) => {
                                if (existingTodo.id === todo.id) {
                                    existingTodo.completed = state
                                }
                                return existingTodo
                            })
                            setTodos(newTodos)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
