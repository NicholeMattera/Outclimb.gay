import Header from 'components/Header/Header'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

import './Contact.scss'

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
