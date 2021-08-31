import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

export const Login = () => {
    const history = useHistory()

    return (
        <div>
            <button onClick={history.goBack}>Back</button>
            <button onClick={() => console.log('logging in')}>Login</button>
        </div>
    )
}
