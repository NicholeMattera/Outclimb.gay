import './Contact.scss'
import Header from 'components/Header/Header'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function Contact() {
    useDocumentTitle('Contact | OutClimb')

    return (
        <>
            <Header />
            <PageContent></PageContent>
        </>
    )
}

export default Contact
