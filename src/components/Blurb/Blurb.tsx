import './Blurb.scss'
import { BlurbType } from 'types/BlurbType'
import classNames from 'classnames'
import { useMemo } from 'react'

type BlurbProps = {
    children?: React.ReactNode
    height?: string
    image: string
    image2x?: string
    imageAlt: string
    type: BlurbType
}

function Blurb(props: BlurbProps) {
    const imageSourceSet = useMemo(() => {
        if (props.image2x) {
            return `${props.image} 1x, ${props.image2x} 2x`
        }

        return `${props.image} 1x`
    }, [props.image, props.image2x])

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
