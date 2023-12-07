import './NotFound.scss'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function NotFound() {
    useDocumentTitle('Page Not Found | OutClimb')

    return (
        <>
            <Header />
            <PageContent>
                <Hero
                    image="/assets/images/charles.webp"
                    image2x="/assets/images/charles-2x.webp"
                    imageAlt="Charles the crag toad at Interstate State Park"
                    title="Page Not Found"
                />
            </PageContent>
        </>
    )
}

export default NotFound
