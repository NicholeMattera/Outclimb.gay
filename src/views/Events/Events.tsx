import Header from 'components/Header/Header'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import EventResponse from 'types/EventResponse'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Events.scss'

function Events() {
    useDocumentTitle('Events | OutClimb')

    const [events, setEvents] = useState<Array<EventResponse>>([])
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const { data } = await axios.get<Array<EventResponse>>('/api/v1/events')
                setEvents(data)
            } catch (error) {
                setError(error as Error)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])

    return (
        <>
            <Header />
            <PageContent>
                {isLoading && <p>Loading</p>}
                {!isLoading && error !== null && <h2>{error.toString()}</h2>}
                {!isLoading &&
                    error === null &&
                    events.map((event) => (
                        <div key={event.Slug}>
                            <h2>
                                <Link to={`/events/${event.Slug}`}>{event.Name}</Link>
                            </h2>
                        </div>
                    ))}
            </PageContent>
        </>
    )
}

export default Events
