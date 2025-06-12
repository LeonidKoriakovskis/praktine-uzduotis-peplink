import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

const JokesPage: React.FC = () => {
    const [joke, setJoke] = useState('')
    const [timestamp, setTimestamp] = useState('')

    const updateJoke = async () => {
        try{
            const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev')
            const data = await response.json()
            setJoke(data.value)
            setTimestamp(new Date().toLocaleTimeString())
        } catch (error) {
            console.error('Error fetching joke:', error)
            setJoke('Failed to fetch joke')
        }
    }

    useEffect(() => {
        updateJoke()
        const intervalId = setInterval(updateJoke,15000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="jokes-container">
            <Navbar />
            <h1 className="jokes-title">Juokelis</h1>
            <p className="joke-content">{joke}</p>
            <p className="timestamp">
                Paskutinį kartą atnaujinta: <span className="timestamp-value">{timestamp}</span>
            </p>
        </div>
    )
}

export default JokesPage