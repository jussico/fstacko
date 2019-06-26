import React from 'react'

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
            <p><b>total of {parts.map(x => x.exercises).reduce((left, right) => left + right)} exercises </b></p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header nimi={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div >
    )
}

export default Course
