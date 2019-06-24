import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ klikkaus, teksti }) => {
    return (
        <>
            <button onClick={() => klikkaus()} >{teksti}</button>
        </>
    )
}

const Feedback = ({ api }) => {
    return (
        <>
            <h1>give feedback</h1>
            <Button klikkaus={api.addGood} teksti="good" />
            <Button klikkaus={api.addNeutral} teksti="neutral" />
            <Button klikkaus={api.addBad} teksti="bad" />
        </>
    )
}

const Statistic = ({ teksti, arvo }) => {
    return (
        <>
            <tr key={teksti}>
                <td>{teksti}</td><td>{arvo}</td>
            </tr>
        </>
    )
}

const Statistics = ({ api }) => {
    if (api.good === 0 && api.bad === 0 && api.neutral === 0) {
        return (<h1> No feedback given</h1>)
    } else {
        return (
            <>
                <h1>statistics</h1>
                <table>
                    <tbody>
                        <Statistic teksti="good" arvo={api.good} />
                        <Statistic teksti="neutral" arvo={api.neutral} />
                        <Statistic teksti="bad" arvo={api.bad} />
                        <Statistic teksti="all" arvo={api.bad + api.neutral + api.good} />
                        <Statistic teksti="average" arvo={(api.bad * (-1) + api.neutral * 0 + api.good) / (api.bad + api.neutral + api.good)} />
                        <Statistic teksti="positive" arvo={(100 * api.good) / (api.bad + api.neutral + api.good) + ' %'} />
                    </tbody>
                </table>
            </>
        )
    }
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const api = {
        good: good,
        addGood: () => setGood(good + 1),
        neutral: neutral,
        addNeutral: () => setNeutral(neutral + 1),
        bad: bad,
        addBad: () => setBad(bad + 1)
    }
    return (
        <>
            <Feedback api={api} />
            <Statistics api={api} />
        </>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)