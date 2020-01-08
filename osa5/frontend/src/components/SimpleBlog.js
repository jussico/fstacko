import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='title_and_author'>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <button className='nappi' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
