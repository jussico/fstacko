import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ nimi }) => {
    return (
        <>
            <h1>{nimi}</h1>
        </>
    )
}

const Part = ({ tiedot }) => {
    return (
        <p>
            {tiedot.name} {tiedot.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map(part => (
            <Part key={part.name} tiedot={part} />
        ))
    )
}

const Total = ({ parts }) => {
    return (
        <>
            <p>Number of exercises {parts.map(x => x.exercises).reduce((left, right) => left + right)}</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header nimi={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div >
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
