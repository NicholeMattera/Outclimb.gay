import './Event.scss'
import Header from 'components/Header/Header'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import useEventStore from 'stores/useEventStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Event() {
    const [title, setTitle] = useState('Event | OutClimb')
    useDocumentTitle(title)

    const { slug } = useParams()
    const { getEvent } = useEventStore()
    const { error, event, status } = getEvent(slug || '')

    useEffect(() => {
        if (status === 'success' && event) {
            setTitle(`${event.Name} | OutClimb`)
        }
    }, [event, status])

    return (
        <>
            <Header />
            <PageContent>
                {status === 'loading' && <p>Loading</p>}
                {status === 'error' && error != null && <h2>{error.toString()}</h2>}
                {status === 'success' && event && <h2>{event?.Name}</h2>}
            </PageContent>
        </>
    )
}

export default Event
