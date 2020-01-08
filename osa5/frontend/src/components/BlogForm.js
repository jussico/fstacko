import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {
    return (
        <div>
            <h2>create new blog</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    title:
          <input className='tittelix'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
          <input className='authorx'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
          <input className='urlx'
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    // title: PropTypes.string.isRequired,
    // author: PropTypes.string.isRequired,
    // url: PropTypes.string.isRequired
}

export default BlogForm

// --

// import React from 'react'

// const NoteForm = ({ onSubmit, handleChange, value }) => {
//   return (
//     <div>
//       <h2>Create a new note</h2>

//       <form onSubmit={onSubmit}>
//         <input
//           value={value}
//           onChange={handleChange}
//         />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }

// export default NoteForm
