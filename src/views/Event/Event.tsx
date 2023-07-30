import Header from 'components/Header/Header'
import useDocumentTitle from 'hooks/useDocumentTitle'
import EventResponse from 'types/EventResponse'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './Event.scss'

function Event() {
    const [title, setTitle] = useState('Event | OutClimb')
    useDocumentTitle(title)

    const { eventId } = useParams()
    const [event, setEvent] = useState<EventResponse | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const { data } = await axios.get<EventResponse>(`/api/v1/events/${eventId}`)
                setEvent(data)
                setTitle(`${data.Name} | OutClimb`)
            } catch (error) {
                setError(error as Error)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [eventId])

    return (
        <>
            <Header />
            {isLoading && <p>Loading</p>}
            {!isLoading && error === null && <h2>{event?.Name}</h2>}
            {!isLoading && error !== null && <h2>{error.toString()}</h2>}
        </>
    )
}

export default Event
