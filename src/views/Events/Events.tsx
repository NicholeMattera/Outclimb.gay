import './Events.scss'
import Header from 'components/Header/Header'
import { Link } from 'react-router-dom'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import useEventStore from 'stores/useEventStore'

function Events() {
    useDocumentTitle('Events | OutClimb')

    const { GetEvents } = useEventStore()
    const { error, events, status } = GetEvents()

    return (
        <>
            <Header />
            <PageContent>
                {status === 'loading' && <p>Loading</p>}
                {status === 'error' && error != null && <h2>{error.toString()}</h2>}
                {status === 'success' &&
                    events &&
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
