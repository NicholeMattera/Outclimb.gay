import './Home.scss'
import Blurb from 'components/Blurb/Blurb'
import { BlurbType } from 'types/BlurbType'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import useEventStore from 'stores/useEventStore'
import useLongEventDate from 'hooks/useLongEventDate'

function Home() {
    useDocumentTitle('OutClimb')

    const { GetUpcomingEvent } = useEventStore()
    const { event, status } = GetUpcomingEvent()

    const eventStart = useLongEventDate(event, status)

    return (
        <>
            <Header />
            <PageContent>
                <div className="home">
                    {status === 'success' && event != null && (
                        <Hero
                            description={eventStart}
                            href={`/events/${event.slug}`}
                            image={event.image}
                            imageAlt={event.imageAlt}
                            title={event.name}
                        />
                    )}

                    <Blurb image="/assets/images/mbp.webp" imageAlt="" type={BlurbType.ImageLeft}>
                        <h2>About Us</h2>
                        <p>
                            OutClimb is a minneapolis-based organization dedicated to making climbing accessible to as
                            many trans and queer people as possible. We offer free outdoor meet-ups, bi-weekly climbing
                            meet-ups, and work with Minneapolis Bouldering Project for cost-accessible indoor climbing.
                            We are a space that strives to be inclusive to all through communal check ins, group
                            activities, pronouns and names, encouragement, and friendship.
                        </p>
                    </Blurb>
                </div>
            </PageContent>
        </>
    )
}

export default Home
