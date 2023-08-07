import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import './Hero.scss'

type HeroProps = {
    description?: string
    href?: string
    image: string
    imageAlt: string
    title?: string
}

function Hero(props: HeroProps) {
    const imageStyles = useMemo(() => {
        return {
            backgroundImage: `url(${props.image})`,
        }
    }, [props.image])

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
        }

        return
    }

    return (
        <div className="hero">
            <div aria-label={props.imageAlt} className="hero__image" role="img" style={imageStyles} />
            {renderContent(props.description, props.href, props.title)}
        </div>
    )
}

export default Hero
