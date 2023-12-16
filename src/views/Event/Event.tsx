import './Event.scss'
import { useEffect, useState } from 'react'
import Button from 'components/Button/Button'
import DateUtil from 'utils/date.utils'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import LinkResponse from 'types/LinkResponse'
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

    const getLinkName = (link: LinkResponse): string => {
        if (!link.disabled) {
            return link.name
        }

        const showOnDate = new Date(link.showOn)
        const formattedShowOnDate = DateUtil.formatLongDate(showOnDate)
        const formattedShowOnTime = DateUtil.formatLongTime(showOnDate)

        return `Registration opens on ${formattedShowOnDate} at ${formattedShowOnTime}`
    }

    const getLinkUrl = (link: LinkResponse): string | undefined => {
        if (!link.disabled) {
            return link.url
        }

        return undefined
    }

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
                            image2x={event.image2x}
                            imageAlt={event.imageAlt}
                            title={event.name}
                        />

                        <div className="event__body" dangerouslySetInnerHTML={{ __html: event.body }}></div>

                        <div className="event__links">
                            {event.links.map((link) => (
                                <Button
                                    disabled={link.disabled}
                                    key={link.name}
                                    label={getLinkName(link)}
                                    href={getLinkUrl(link)}
                                    target="_blank"
                                />
                            ))}
                        </div>
                    </>
                )}
            </PageContent>
        </>
    )
}

export default Event
