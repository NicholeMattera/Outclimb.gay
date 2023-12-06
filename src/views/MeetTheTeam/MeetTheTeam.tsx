import './MeetTheTeam.scss'
import Blurb from 'components/Blurb/Blurb'
import { BlurbType } from 'types/BlurbType'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function MeetTheTeam() {
    useDocumentTitle('Meet the Team | OutClimb')

    return (
        <>
            <Header />
            <PageContent>
                <div className="meet-the-team">
                    <Hero
                        image="/assets/images/meet_the_team.webp"
                        image2x="/assets/images/meet_the_team-2x.webp"
                        imageAlt=""
                        title="Meet the Team"
                    />

                    <Blurb
                        height="240px"
                        image="/assets/images/home1.webp"
                        imageAlt="Photo from a skill share event at Sugar Loaf Bluff on July 26th 2023"
                        type={BlurbType.ImageLeft}
                    >
                        <h2>Dustin (He/Him)</h2>
                    </Blurb>

                    <Blurb
                        height="240px"
                        image="/assets/images/home2.webp"
                        imageAlt="Group photo from an outdoor meet-up at Interstate State Park on March 27th 2023"
                        type={BlurbType.ImageRight}
                    >
                        <h2>Randi (They/Them)</h2>
                    </Blurb>

                    <Blurb
                        height="240px"
                        image="/assets/images/home2.webp"
                        imageAlt="Group photo from an outdoor meet-up at Interstate State Park on March 27th 2023"
                        type={BlurbType.ImageLeft}
                    >
                        <h2>Nickel (She/They)</h2>
                    </Blurb>

                    <Blurb
                        height="240px"
                        image="/assets/images/home2.webp"
                        imageAlt="Group photo from an outdoor meet-up at Interstate State Park on March 27th 2023"
                        type={BlurbType.ImageRight}
                    >
                        <h2>Alys (They/Them)</h2>
                    </Blurb>

                    <Blurb
                        height="240px"
                        image="/assets/images/home2.webp"
                        imageAlt="Group photo from an outdoor meet-up at Interstate State Park on March 27th 2023"
                        type={BlurbType.ImageLeft}
                    >
                        <h2>Matt (They/Them)</h2>
                    </Blurb>
                </div>
            </PageContent>
        </>
    )
}

export default MeetTheTeam
