import './NotFound.scss'
import Header from 'components/Header/Header'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function NotFound() {
    useDocumentTitle('Not Found | OutClimb')

    return (
        <>
            <Header />
            <PageContent></PageContent>
        </>
    )
}

export default NotFound
