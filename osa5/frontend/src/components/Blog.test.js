import React from 'react'
// import { render, fireEvent } from '@testing-library/react' // highlight-line
import { render } from '@testing-library/react' // highlight-line
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Nemesis',
        author: 'Asimov, Isaac'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Nemesis'
    )

    expect(component.container).toHaveTextContent(
        'Asimov, Isaac'
    )
})

// --

// import React from 'react'
// import { render, fireEvent } from '@testing-library/react' // highlight-line
// import { prettyDOM } from '@testing-library/dom'
// import Note from './Note'

// test('renders content', () => {
//   const note = {
//     content: 'Component testing is done with react-testing-library',
//     important: true
//   }

//   const component = render(
//     <Note note={note} />
//   )

//   expect(component.container).toHaveTextContent(
//     'Component testing is done with react-testing-library'
//   )
// })

// test('clicking the button calls event handler once', async () => {
//   const note = {
//     content: 'Component testing is done with react-testing-library',
//     important: true
//   }

//   const mockHandler = jest.fn()

//   const { getByText } = render(
//     <Note note={note} toggleImportance={mockHandler} />
//   )

//   const button = getByText('make not important')
//   fireEvent.click(button)

//   expect(mockHandler.mock.calls.length).toBe(1)
// })
