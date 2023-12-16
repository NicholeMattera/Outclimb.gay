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
                            image2x={event.image2x}
                            imageAlt={event.imageAlt}
                            title={event.name}
                        />
                    )}

                    <h2 className="home__headline">
                        OutClimb is a minneapolis-based organization dedicated to making climbing accessible to as many
                        trans and queer people as possible.
                    </h2>

                    <Blurb
                        height="240px"
                        image="/assets/images/home1.webp"
                        image2x="/assets/images/home1-2x.webp"
                        imageAlt="Photo from a skill share event at Sugar Loaf Bluff on July 26th 2023"
                        type={BlurbType.ImageLeft}
                    >
                        <h2>We offer free...</h2>
                        <ul>
                            <li>Outdoor meet-ups</li>
                            <li>Outdoor skill shares</li>
                            <li>Bouldering meet-ups every first and third Thursday of the month</li>
                        </ul>
                    </Blurb>

                    <Blurb
                        height="240px"
                        image="/assets/images/home2.webp"
                        image2x="/assets/images/home2-2x.webp"
                        imageAlt="Group photo from an outdoor meet-up at Interstate State Park on March 27th 2023"
                        type={BlurbType.ImageRight}
                    >
                        <p>
                            We work with Bouldering Project Minneapolis for cost-accessible indoor climbing. We also
                            provide a space that strives to be inclusive through communal check-ins, group activities,
                            sharing of names &amp; pronouns, encouragement, and friendship.
                        </p>
                    </Blurb>
                </div>
            </PageContent>
        </>
    )
}

export default Home
