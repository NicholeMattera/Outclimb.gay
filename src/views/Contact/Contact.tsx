import Header from 'components/Header/Header';
import useDocumentTitle from 'hooks/useDocumentTitle';

import './Contact.scss';

function Contact() {
    useDocumentTitle('Contact | OutClimb');

    return (
        <>
            <Header />
        </>
    );
}

export default Contact;
