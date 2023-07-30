import Header from 'components/Header/Header'
import useDocumentTitle from 'hooks/useDocumentTitle'

import './NotFound.scss'

function NotFound() {
    useDocumentTitle('Not Found | OutClimb')

    return (
        <>
            <Header />
        </>
    )
}

export default NotFound
