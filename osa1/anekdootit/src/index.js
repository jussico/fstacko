import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const dootit = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anekdootti = ({ teksti, luku }) => {
    return (
        <>
            <div>
                {teksti}
            </div>
            <div>
                has {luku} votes
            </div>
        </>
    )
}

const AnekdoottiPaivan = ({ api }) => {
    return (
        <>
            <h1>Anecdote of the day</h1>
            <Anekdootti teksti={api.anekdootit[api.selected]} luku={api.votes[api.selected]}/>
        </>
    )
}

const MostVotes = ({ api }) => {
    const indeksini = api.votes.indexOf(Math.max(...api.votes))
    return (
        <>
            <h1>Anecdote with most votes</h1>
            <Anekdootti teksti={api.anekdootit[indeksini]} luku={api.votes[indeksini]}/>
        </>
    )
}

const ButtonNext = ({ api }) => {
    return (
        <button onClick={() => api.setSelected()}>next anecdote</button>
    )
}

const ButtonVoteCurrent = ({ api }) => {
    return (
        <button onClick={() => api.voteCurrent()}>vote this great thing</button>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [aanet, setAanet] = useState(new Array(anecdotes.length).fill(0))
    const api = {
        anekdootit: anecdotes,
        selected: selected,
        setSelected: () => {
            let sluku = Math.floor(Math.random() * anecdotes.length)
            setSelected(sluku)
        },
        votes: aanet,
        voteCurrent: () => {
            // console.log("aanet ennen vote: ", aanet)
            const copy = [...aanet]
            copy[selected] += 1
            setAanet(copy)
            // console.log("copy jalkeen vote: ", copy)
            // console.log("aanet jalkeen vote: ", aanet) // TODO: ei ole päivittynyt tässä kohtaa. miksi?
        }
    }
    return (
        <>
            <AnekdoottiPaivan api={api} />
            <ButtonVoteCurrent api={api} />
            <ButtonNext api={api} />
            <MostVotes api={api} />
        </>
    )
}

ReactDOM.render(
    <App anecdotes={dootit} />,
    document.getElementById('root')
)