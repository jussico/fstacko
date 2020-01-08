// import React, { useState, useImperativeHandle } from 'react'
import React, { useState, useEffect } from 'react'
//import blogService from '../services/blogs'
import userService from '../services/users'

// const Blog = ({ blog, toggleVisibility, nakyva }) => {
// const Blog = ({ blog, loggedUser }) => {
const Blog = ({ blog }) => {

    const [visible, setVisible] = useState(false)
    // const [deletable, setDeletable] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const [user, setUser] = useState({})

    // const allUsers = userService.getAll()

    // const user = allUsers.where(user => user.id = blog.id)[0]


    useEffect(() => {
        const asetaKayttaja = (users) => {
            users.forEach(x => {
                if (x.id === blog.id) {
                    setUser(x)
                }
            })
        }
        userService
            .getAll()
            //.map(blog => { blog.visible = true })
            //.forEach(blog => blog.visible = true )
            // .then(initialBlogs => setBlogs(initialBlogs))
            .then(users => asetaKayttaja(users))
    }, [blog.id])

    useEffect(() => {
        // if ( user.id == loggedUser.id ) {
        // setDeletable(true)
        // }
    }, [])

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const likeIt = () => {
        console.log('liking it')
        setLikes(likes + 1)
        //blogService.update(blog)
        // blog.likes = blog.likes + 1
        //setVisible(!visible)
    }

    return (
        <div>
            <button onClick={toggleVisibility}>{blog.title} {blog.author}</button>

            {/* {blog.title} {blog.author} */}
            {/* <button onClick={ () => nakyva = !nakyva }>{blog.title}</button> */}
            {/* <button onClick={toggleVisibility}>{blog.title}</button> */}
            {/* {visible === true ? blog.url : ''} */}
            {visible ? (
                <div>
                    <div>{blog.url}</div>
                    <div>{likes} likes <button onClick={likeIt}>like</button></div>
                    <div>{user.name}</div>
                </div>
            ) : (
                    ''
                )}
            {/* {nakyva === true ? 'NTITLE:' + blog.title : 'NPIILOS'} */}
        </div>
    )
}

export default Blog

// import React from 'react'

// const Note = ({ note, toggleImportance }) => {
//   const label = note.important
//     ? 'make not important' : 'make important'

//   return (
//     <li className='note'>
//       {note.content}
//       <button onClick={toggleImportance}>{label}</button>
//     </li>
//   )
// }

// export default Note