import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const Logout = () => {

    const [navigate, setNavigate] = useState(true)

    const logout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.localStorage.clear()
        window.localStorage.clear('loggedBlogappUser')
        setNavigate(false)
    }

    return (
        <div>
            {
                navigate ? (
                    <Button onClick={logout}>Log out</Button>
                ) : (
                        <Redirect to='/' push={true} />
                    )
            }
        </div >
    )
}

export default Logout
