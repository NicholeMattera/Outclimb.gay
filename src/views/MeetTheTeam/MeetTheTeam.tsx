import './MeetTheTeam.scss'
import Blurb from 'components/Blurb/Blurb'
import { BlurbType } from 'types/BlurbType'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function MeetTheTeam() {
    useDocumentTitle('Meet the Team | OutClimb')

    const members = [
        {
            image: {
                normal: '/assets/images/dustin.webp',
                double: '/assets/images/dustin-2x.webp',
            },
            name: 'Dustin',
            pronouns: 'He/Him',
            description:
                'I have been helping with OutClimb since 2019 and took over leadership in early 2023. I started climbing in 2012 while I was going to school in Denver. I was really lucky to have an inexpensive and comprehensive introduction to climbing all the way up to leading trad. I recognize not everyone will be able to overcome the high bar of access to knowledge, skills, and opportunity, so I want to work at making it as easy to start climbing as I can.',
        },
        {
            image: {
                normal: '/assets/images/nickel.webp',
                double: '/assets/images/nickel-2x.webp',
            },
            name: 'Nickel',
            pronouns: 'She/They',
            description:
                'I started climbing in March of 2022 after a good friend told me about it. I then moved up to Minnesota a few months later and, shortly after that, found out about OutClimb. Since joining OutClimb, I have expanded my climbing knowledge and experience in a little over a year from just climbing strictly indoors to climbing outdoors, setting up top rope anchors, sport and trad lead climbing, and much more. Outside of climbing, OutClimb has also allowed me to meet and become friends with so many people in the queer community here in the Twin Cities.',
        },
    ]

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
                    {members.map((member, index) => (
                        <Blurb
                            key={member.name}
                            height="240px"
                            image={member.image.normal}
                            image2x={member.image.double}
                            imageAlt=""
                            type={index % 2 === 0 ? BlurbType.ImageLeft : BlurbType.ImageRight}
                        >
                            <h2>
                                {member.name} ({member.pronouns})
                            </h2>
                            <p>{member.description}</p>
                        </Blurb>
                    ))}
                </div>
            </PageContent>
        </>
    )
}

export default MeetTheTeam
