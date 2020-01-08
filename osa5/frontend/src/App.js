import React, { useState, useEffect } from 'react'

//import Note from './components/Note'
import Blog from './components/Blog'

import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

// import NoteForm from './components/NoteForm'
import BlogForm from './components/BlogForm'

import Logout from './components/Logout'

//import noteService from './services/notes'
import blogService from './services/blogs'

import loginService from './services/login'

const App = () => {

    //   const [notes, setNotes] = useState([])
    // const [blogs, setBlogs] = useState([])
    const [blogs, setBlogs] = useState([])

    const asetaBlogit = (x) => {
        x.forEach(blog => blog.visible = true)
        setBlogs(x)
    }

    //   const [newNote, setNewNote] = useState('')
    const [newBlog, setNewBlog] = useState({}) // {} ok??

    //const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        blogService
            .getAll()
            //.map(blog => { blog.visible = true })
            //.forEach(blog => blog.visible = true )
            // .then(initialBlogs => setBlogs(initialBlogs))
            .then(initialBlogs => asetaBlogit(initialBlogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogsToShow = blogs

    // const blogsToShow = showAll
    //     ? blogs
    //     : blogs
    // : blogs.filter(blog => blog.important)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage('Correct credentials!')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    // const handleLogOut = async (event) => {
    //     event.preventDefault()
    //     console.log('LOGGING OUT!')
    //     window.localStorage.removeItem('loggedBlogappUser')
    //     window.localStorage.clear()


    // }

    const rows = () => blogsToShow.map(blog =>
        <Blog
            key={blog.id}
            blog={blog}
            //toggleVisibility={() => toggleVisibilityOf(blog)}
            // nakyva = { true }
            //nakyva = { blog.visible }
            loggedUser={user}
        />
    )

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>log in</button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    const onTitleChange = (event) => {
        newBlog.title = event.target.value
    }

    const onAuthorChange = (event) => {
        newBlog.author = event.target.value
    }

    const onUrlChange = (event) => {
        newBlog.url = event.target.value
    }

    const blogFormRef = React.createRef()

    const addBlog = (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()

        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        }

        blogService
            .create(blogObject)
            .then(data => {
                setBlogs(blogs.concat(data))
                setNewBlog('')
            })

        setMessage('new Blog created!')
    }

    return (
        <div>
            <h1>Blogs</h1>

            <Notification message={message} />

            <ErrorNotification message={errorMessage} />

            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm
                            title={newBlog.title}
                            author={newBlog.author}
                            url={newBlog.url}
                            handleSubmit={addBlog}
                            handleTitleChange={onTitleChange}
                            handleAuthorChange={onAuthorChange}
                            handleUrlChange={onUrlChange}
                        />
                    </Togglable>
                    <div>
                        <ul>
                            {rows()}
                        </ul>
                        <Logout />
                    </div>
                </div>
            }

            {/* <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div> */}

            <Footer />
        </div>
    )
}

export default App
