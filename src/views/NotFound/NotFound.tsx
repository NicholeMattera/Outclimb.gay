import './NotFound.scss'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import { HeroType } from 'types/HeroType'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function NotFound() {
    useDocumentTitle('Page Not Found | OutClimb')

    return (
        <>
            <Header />
            <Hero image="/assets/images/charles.webp" image2x="/assets/images/charles-2x.webp" type={HeroType.Short} />
            <PageContent>
                <div className="not-found">
                    <h1>Page Not Found</h1>
                    <p>Sorry, but the page you were trying to view does not exist.</p>
                </div>
            </PageContent>
        </>
    )
}

export default NotFound
