import './Card.scss'

type CardProps = {
    description?: string
    href?: string
    image: string
    imageAlt: string
    title?: string
}

function Card(props: CardProps) {
    return (
        <a className="card" href={props.href}>
            <img alt={props.imageAlt} className="card__image" src={props.image} />
            <h3 className="card__title">{props.title}</h3>
            <p className="card__description">{props.description}</p>
        </a>
    )
}

export default Card
