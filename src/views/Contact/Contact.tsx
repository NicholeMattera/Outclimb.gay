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
                    image="images/contact.webp"
                    imageAlt="Photo of Matt, Randi, Nickel, and Dustin on top of Sugar Loaf Bluff"
                    title="Contact Us"
                />
            </PageContent>
        </>
    )
}

export default Contact
