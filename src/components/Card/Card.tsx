import './Card.scss'
import Link from '../Link/Link'
import useImageSourceSet from 'hooks/useImageSourceSet'

type CardProps = {
    description?: string
    to?: string
    image: string
    image2x?: string
    imageAlt: string
    title?: string
}

function Card(props: CardProps) {
    const imageSourceSet = useImageSourceSet(props.image, props.image2x)

    const renderContent = () => {
        return (
            <>
                <img alt={props.imageAlt} className="card__image" srcSet={imageSourceSet} />
                <h3 className="card__title">{props.title}</h3>
                <p className="card__description">{props.description}</p>
            </>
        )
    }

    return (
        <>
            {props.to ? (
                <Link to={props.to} className="card">
                    {renderContent()}
                </Link>
            ) : (
                <div className="card">{renderContent()}</div>
            )}
        </>
    )
}

export default Card
