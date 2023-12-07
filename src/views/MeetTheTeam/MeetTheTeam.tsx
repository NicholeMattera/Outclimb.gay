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
                <Hero
                    image="/assets/images/meet_the_team.webp"
                    image2x="/assets/images/meet_the_team-2x.webp"
                    imageAlt=""
                    title="Meet the Team"
                />

                <div className="meet-the-team">
                    <Blurb
                        height="240px"
                        image="/assets/images/dustin.webp"
                        image2x="/assets/images/dustin-2x.webp"
                        imageAlt="Photo from a skill share event at Sugar Loaf Bluff on July 26th 2023"
                        type={BlurbType.ImageLeft}
                    >
                        <h2>Dustin (He/Him)</h2>
                        <p>
                            I have been helping with OutClimb since 2019 and took over leadership in early 2023. I
                            started climbing in 2012 while I was going to school in Denver. I was really lucky to have
                            an inexpensive and comprehensive introduction to climbing all the way up to leading trad. I
                            recognize not everyone will be able to overcome the high bar of access to knowledge, skills,
                            and opportunity, so I want to work at making it as easy to start climbing as I can.
                        </p>
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
