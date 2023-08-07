import { useMemo } from 'react'
import { BlurbType } from 'types/BlurbType'

import './Blurb.scss'

type BlurbProps = {
    children?: React.ReactNode
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

    return (
        <div className="blurb">
            <div aria-label={props.imageAlt} className="blurb__image" role="img" style={imageStyles} />
            <div className="blurb__content">{props.children}</div>
        </div>
    )
}

export default Blurb
