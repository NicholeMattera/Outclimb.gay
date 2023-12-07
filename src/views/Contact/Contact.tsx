import './Contact.scss'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function Contact() {
    useDocumentTitle('Contact | OutClimb')

    return (
        <>
            <Header />
            <PageContent>
                <Hero
                    image="/assets/images/contact.webp"
                    image2x="/assets/images/contact-2x.webp"
                    imageAlt="Photo of Matt, Randi, Nickel, and Dustin on top of Sugar Loaf Bluff"
                    title="Contact Us"
                />

                <div className="contact">
                    <p>
                        <strong>Phone</strong>: (612) 440-9209
                    </p>
                    <p>
                        <strong>Email</strong>: <a href="mailto:info@outclimb.gay">info@outclimb.gay</a>
                    </p>
                    <p>
                        <strong>Facebook</strong>:{' '}
                        <a href="https://www.facebook.com/groups/1070762049768453" rel="noreferrer" target="blank">
                            OutClimb MN
                        </a>
                    </p>
                    <p>
                        <strong>Instagram</strong>:{' '}
                        <a href="https://www.instagram.com/outclimbmn" rel="noreferrer" target="blank">
                            @outclimbmn
                        </a>
                    </p>
                </div>
            </PageContent>
        </>
    )
}

export default Contact
