import Blurb from 'components/Blurb/Blurb'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { BlurbType } from 'types/BlurbType'

import './Home.scss'

function Home() {
    useDocumentTitle('OutClimb')

    return (
        <>
            <Header />
            <PageContent>
                <div className="home">
                    <Hero
                        description="Sunday August 13th • 9:15am"
                        href="/events/20230813-outdoor-climbing-saint-croix-falls"
                        image="/images/taylor_falls.webp"
                        imageAlt=""
                        title="Outdoor Climbing - Interstate State Park / Saint Croix Falls WI"
                    />

                    <Blurb image="/images/mbp.webp" imageAlt="" type={BlurbType.ImageLeft}>
                        <h2>About Us</h2>
                        <p>
                            Outclimb is a minneapolis-based organization dedicated to making climbing accessible to as
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
