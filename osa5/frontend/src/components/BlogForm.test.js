// import React, { useState } from 'react'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const Wrapper = (props) => {

    const onTitleChange = (event) => {
        props.state.title = event.target.value
    }

    const onAuthorChange = (event) => {
        props.state.author = event.target.value
    }

    const onUrlChange = (event) => {
        props.state.url = event.target.value
    }

    return (
        <BlogForm
            title={props.state.title}
            author={props.state.author}
            url={props.state.url}
            handleSubmit={props.handleSubmit}
            handleTitleChange={onTitleChange}
            handleAuthorChange={onAuthorChange}
            handleUrlChange={onUrlChange}
        />
    )
}

test('<BlogForm /> updates parent state and calls handleSubmit', () => {
    const handleSubmit = jest.fn()
    const state = {
        title: 'titlee',
        author: 'tekijaa',
        url: 'urlii'
    }

    const component = render(
        <Wrapper handleSubmit={handleSubmit} state={state}
        />
    )

    //console.log('container on: ' + component.container.innerHTML)

    const form = component.container.querySelector('form')

    const input = component.container.querySelector('.tittelix')
    fireEvent.change(input, {
        target: {
            value: 'titleeMuuttunut',
        }
    })
    fireEvent.submit(form)
    expect(state.title).toBe('titleeMuuttunut')


    const inputAuthor = component.container.querySelector('.authorx')
    fireEvent.change(inputAuthor, {
        target: {
            value: 'authorMuuttunut',
        }
    })
    fireEvent.submit(form)
    expect(state.author).toBe('authorMuuttunut')

    const inputUrl = component.container.querySelector('.urlx')
    fireEvent.change(inputUrl, {
        target: {
            value: 'urlMuuttunut',
        }
    })
    fireEvent.submit(form)
    expect(state.url).toBe('urlMuuttunut')

    //expect(handleSubmit.mock.calls.length).toBe(1)
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
