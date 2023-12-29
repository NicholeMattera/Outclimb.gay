import './Contact.scss'
import Button from 'components/Button/Button'
import { ButtonType } from 'types/ButtonType'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import { HeroType } from 'types/HeroType'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'

function Contact() {
    useDocumentTitle('Contact | OutClimb')

    return (
        <>
            <Header />
            <Hero image="/assets/images/contact.webp" image2x="/assets/images/contact-2x.webp" type={HeroType.Short} />
            <PageContent title="Contact Us">
                <div className="contact__methods">
                    <Button href="tel:+1-612-440-9209" label="(612) 440-9209" type={ButtonType.Primary} />
                    <Button href="mailto:info@outclimb.gay" label="info@outclimb.gay" type={ButtonType.Primary} />
                </div>
                <div className="contact__social">
                    <a
                        className="contact__social-item contact__social-item--facebook"
                        href="https://www.facebook.com/groups/1070762049768453"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i aria-hidden="true" className="fa-brands fa-square-facebook"></i>
                        <span className="fa-sr-only">Facebook Group</span>
                    </a>
                    <a
                        className="contact__social-item contact__social-item--instagram"
                        href="https://www.instagram.com/outclimbmn"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i aria-hidden="true" className="fa-brands fa-square-instagram"></i>
                        <span className="fa-sr-only">Instagram</span>
                    </a>
                    <a
                        className="contact__social-item contact__social-item--discord"
                        href="https://discord.outclimb.gay"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i aria-hidden="true" className="fa-brands fa-discord"></i>
                        <span className="fa-sr-only">Discord Server</span>
                    </a>
                </div>
            </PageContent>
        </>
    )
}

export default Contact
