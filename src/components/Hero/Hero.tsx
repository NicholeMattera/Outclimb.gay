import './Hero.scss'
import Link from '../Link/Link'
import useImageSourceSet from 'hooks/useImageSourceSet'

type HeroProps = {
    description?: string
    href?: string
    image: string
    image2x?: string
    imageAlt: string
    title?: string
}

function Hero(props: HeroProps) {
    const imageSourceSet = useImageSourceSet(props.image, props.image2x)

    const renderContent = (description?: string, href?: string, title?: string) => {
        if (href && title && description) {
            return (
                <Link to={href} className="hero__content">
                    <hgroup>
                        <h2>{props.title}</h2>
                        <p>{props.description}</p>
                    </hgroup>
                </Link>
            )
        } else if (href && (title || description)) {
            return (
                <Link to={href} className="hero__content">
                    <h2>
                        {props.title}
                        {props.description}
                    </h2>
                </Link>
            )
        } else if (title && description) {
            return (
                <div className="hero__content">
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                </div>
            )
        } else if (title || description) {
            return (
                <div className="hero__content">
                    <h2>
                        {props.title}
                        {props.description}
                    </h2>
                </div>
            )
        }

        return
    }

    return (
        <div className="hero">
            <img srcSet={imageSourceSet} alt={props.imageAlt} className="hero__image" />
            {renderContent(props.description, props.href, props.title)}
        </div>
    )
}

export default Hero
