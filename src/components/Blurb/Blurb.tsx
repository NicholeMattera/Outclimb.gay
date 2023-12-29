import './Blurb.scss'
import { BlurbType } from 'types/BlurbType'
import classNames from 'classnames'
import useImageSourceSet from 'hooks/useImageSourceSet'

type BlurbProps = {
    children?: React.ReactNode
    height?: string
    image: string
    image2x?: string
    imageAlt: string
    type: BlurbType
}

function Blurb(props: BlurbProps) {
    const imageSourceSet = useImageSourceSet(props.image, props.image2x)

    const blurbClasses = classNames({
        blurb: true,
        'blurb--image-right': props.type === BlurbType.ImageRight,
    })

    return (
        <div className={blurbClasses}>
            <img srcSet={imageSourceSet} alt={props.imageAlt} className="blurb__image" />
            <div className="blurb__content">{props.children}</div>
        </div>
    )
}

export default Blurb
