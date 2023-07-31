import Header from 'components/Header/Header'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

import './Home.scss'

function Home() {
    useDocumentTitle('OutClimb')

    return (
        <>
            <Header />
            <PageContent></PageContent>
        </>
    )
}

export default Home
