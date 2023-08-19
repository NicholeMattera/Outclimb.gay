import './Events.scss'
import Card from 'components/Card/Card'
import DateUtil from 'utils/date.utils'
import EventResponse from 'types/EventResponse'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import useEventStore from 'stores/useEventStore'

function Events() {
    useDocumentTitle('Events | OutClimb')

    const { GetUpcomingEvents } = useEventStore()
    const { error, events, status } = GetUpcomingEvents()

    const getEventDescription = (event: EventResponse) => {
        const startDate = new Date(event.startTime)
        const formattedStartDate = DateUtil.formatShortDate(startDate)
        const formattedStart = `${formattedStartDate} • ${DateUtil.formatLongTime(startDate)}`

        if (event.endTime !== 0) {
            const endDate = new Date(event.endTime)
            const formattedEndDate = DateUtil.formatShortDate(endDate)
            const formattedEndTime = DateUtil.formatLongTime(endDate)

            if (formattedStartDate === formattedEndDate) {
                return `${formattedStart} - ${formattedEndTime}`
            } else {
                return `${formattedStart} - ${formattedEndDate} • ${formattedEndTime}`
            }
        }

        return formattedStart
    }

    return (
        <>
            <Header />
            <PageContent>
                <Hero
                    image="/assets/images/events.webp"
                    imageAlt="Photo from a meetup on July 20th 2023 at Bouldering Project in Minneapolis"
                    title="Upcoming Events"
                />

                {status === 'loading' && <p>Loading</p>}
                {status === 'error' && error != null && <h2>{error.toString()}</h2>}
                {status === 'success' && events && (
                    <div className="events">
                        {events.map((event) => (
                            <Card
                                description={getEventDescription(event)}
                                href={`/events/${event.slug}`}
                                image={event.image}
                                imageAlt={event.imageAlt}
                                key={event.slug}
                                title={event.name}
                            />
                        ))}
                    </div>
                )}
            </PageContent>
        </>
    )
}

export default Events
