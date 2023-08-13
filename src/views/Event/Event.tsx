import './Event.scss'
import { useEffect, useState } from 'react'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import useEventStore from 'stores/useEventStore'
import { useParams } from 'react-router-dom'

function Event() {
    const [title, setTitle] = useState('Event | OutClimb')
    useDocumentTitle(title)

    const { slug } = useParams()
    const { GetEvent } = useEventStore()
    const { error, event, status } = GetEvent(slug || '')

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
                {status === 'success' && event && (
                    <>
                        <Hero image={event.Image} imageAlt={event.ImageAlt} title={event.Name} />

                        <div dangerouslySetInnerHTML={{ __html: event.Body }}></div>
                    </>
                )}
            </PageContent>
        </>
    )
}

export default Event
