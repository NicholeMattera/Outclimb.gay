import './Card.scss'
import { useMemo } from 'react'

type CardProps = {
    description?: string
    href?: string
    image: string
    image2x?: string
    imageAlt: string
    title?: string
}

function Card(props: CardProps) {
    const imageSourceSet = useMemo(() => {
        if (props.image2x) {
            return `${props.image} 1x, ${props.image2x} 2x`
        }

        return `${props.image} 1x`
    }, [props.image, props.image2x])

    return (
        <a className="card" href={props.href}>
            <img alt={props.imageAlt} className="card__image" srcSet={imageSourceSet} />
            <h3 className="card__title">{props.title}</h3>
            <p className="card__description">{props.description}</p>
        </a>
    )
}

export default Card
