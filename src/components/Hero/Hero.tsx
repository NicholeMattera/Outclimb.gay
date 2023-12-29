import './Hero.scss'
import classNames from 'classnames'
import { HeroType } from 'types/HeroType'
import Link from '../Link/Link'
import useImageSourceSet from 'hooks/useImageSourceSet'

type HeroProps = {
    description?: string
    href?: string
    image: string
    image2x?: string
    title?: string
    type?: HeroType
}

function Hero(props: HeroProps) {
    const imageSourceSet = useImageSourceSet(props.image, props.image2x)

    const renderContent = (description?: string, href?: string, title?: string) => {
        if (href && title && description) {
            return (
                <div className="hero__content">
                    <hgroup>
                        <Link to={href}>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </Link>
                    </hgroup>
                </div>
            )
        } else if (href && (title || description)) {
            return (
                <div className="hero__content">
                    <h2>
                        <Link to={href}>{title || description}</Link>
                    </h2>
                </div>
            )
        } else if (title && description) {
            return (
                <div className="hero__content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            )
        } else if (title || description) {
            return (
                <div className="hero__content">
                    <h2>
                        {title}
                        {description}
                    </h2>
                </div>
            )
        }

        return
    }

    const heroClasses = classNames({
        hero: true,
        ['hero--short']: props.type === HeroType.Short,
    })

    return (
        <div className={heroClasses}>
            <img aria-hidden="true" className="hero__image" srcSet={imageSourceSet} />
            {renderContent(props.description, props.href, props.title)}
        </div>
    )
}

export default Hero
