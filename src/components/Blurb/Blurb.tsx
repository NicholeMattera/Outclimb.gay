import './Blurb.scss'
import { BlurbType } from 'types/BlurbType'
import classNames from 'classnames'
import { useMemo } from 'react'

type BlurbProps = {
    children?: React.ReactNode
    height?: string
    image: string
    imageAlt: string
    type: BlurbType
}

function Blurb(props: BlurbProps) {
    const imageStyles = useMemo(() => {
        return {
            backgroundImage: `url(${props.image})`,
        }
    }, [props.image])

    const blurbStyle = useMemo(() => {
        return {
            height: props.height || 'auto',
        }
    }, [props.height])

    const blurbClasses = classNames({
        blurb: true,
        'blurb--image-right': props.type === BlurbType.ImageRight,
    })

    return (
        <div className={blurbClasses} style={blurbStyle}>
            <div aria-label={props.imageAlt} className="blurb__image" role="img" style={imageStyles} />
            <div className="blurb__content">{props.children}</div>
        </div>
    )
}

export default Blurb
