import './Blurb.scss'
import { BlurbType } from 'types/BlurbType'
import { useMemo } from 'react'

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

    const renderContent = () => {
        const image = <div aria-label={props.imageAlt} className="blurb__image" role="img" style={imageStyles} />
        const content = <div className="blurb__content">{props.children}</div>

        return props.type === BlurbType.ImageLeft ? [image, content] : [content, image]
    }

    return <div className="blurb">{renderContent()}</div>
}

export default Blurb
