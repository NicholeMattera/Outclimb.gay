import './Event.scss'
import { useEffect, useState } from 'react'
import Button from 'components/Button/Button'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import useEventStore from 'stores/useEventStore'
import useLongEventDate from 'hooks/useLongEventDate'
import { useParams } from 'react-router-dom'

function Event() {
    const [title, setTitle] = useState('Event | OutClimb')
    useDocumentTitle(title)

    const { slug } = useParams()
    const { GetEvent } = useEventStore()
    const { error, event, status } = GetEvent(slug || '')

    useEffect(() => {
        if (status === 'success' && event) {
            setTitle(`${event.name} | OutClimb`)
        }
    }, [event, status])

    const eventDescription = useLongEventDate(event, status)

    return (
        <>
            <Header />
            <PageContent>
                {status === 'loading' && <p>Loading</p>}
                {status === 'error' && error != null && <h2>{error.toString()}</h2>}
                {status === 'success' && event && (
                    <>
                        <Hero
                            description={eventDescription}
                            image={event.image}
                            imageAlt={event.imageAlt}
                            title={event.name}
                        />

                        <div className="event__body" dangerouslySetInnerHTML={{ __html: event.body }}></div>

                        <div className="event__links">
                            {event.links.map((link) => (
                                <Button key={link.name} label={link.name} href={link.url} target="_blank" />
                            ))}
                        </div>
                    </>
                )}
            </PageContent>
        </>
    )
}

export default Event
