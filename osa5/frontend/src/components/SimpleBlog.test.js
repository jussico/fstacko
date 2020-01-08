// import React, { useState } from 'react'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const Wrapper = (props) => {
    return (
        <SimpleBlog
            blog={props.blog}
            onClick={props.onClick}
        />
    )
}

test('<SimpleBlog /> renders stuff correctly', () => {
    const onClick = jest.fn()
    const blog = {
        title: 'titlee',
        author: 'tekijaa',
        url: 'urlii',
        likes: 77
    }

    const component = render(
        <Wrapper blog={blog} onClick={onClick}
        />
    )

    //console.log('container on: ' + component.container.innerHTML)

    const title_and_author = component.container.querySelector('.title_and_author')
    expect(title_and_author).toHaveTextContent(blog.title)
    expect(title_and_author).toHaveTextContent(blog.author)

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(blog.likes)

    const nappi = component.container.querySelector('.nappi')    
    fireEvent.click(nappi)
    fireEvent.click(nappi)
    expect(onClick.mock.calls.length).toBe(2)

})

// --

// import React from 'react'
// import { render, fireEvent } from '@testing-library/react'
// import NoteForm from './NoteForm'

// const Wrapper = (props) => {

//   const onChange = (event) => {
//     props.state.value = event.target.value
//   }

//   return (
//     <NoteForm
//       value={props.state.value}
//       onSubmit={props.onSubmit}
//       handleChange={onChange}
//     />
//   )
// }

// test('<NoteForm /> updates parent state and calls onSubmit', () => {
//   const onSubmit = jest.fn()
//   const state = {
//     value: ''
//   }

//   const component = render(
//     <Wrapper onSubmit={onSubmit} state={state} />
//   )

//   const input = component.container.querySelector('input')
//   const form = component.container.querySelector('form')

//   fireEvent.change(input, { target: { value: 'testing of forms could be easier' } })
//   fireEvent.submit(form)

//   expect(onSubmit.mock.calls.length).toBe(1)
//   expect(state.value).toBe('testing of forms could be easier')
// })
