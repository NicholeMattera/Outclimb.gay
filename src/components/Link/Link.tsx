import * as ReactRouterDom from 'react-router-dom'
import { useMemo } from 'react'
import useVersion from 'hooks/useVersion'

function Link(props: ReactRouterDom.LinkProps) {
    const version = useVersion()
    const to = useMemo(() => {
        return version ? `${props.to}?version=${version}` : props.to
    }, [props.to, version])

    return <ReactRouterDom.Link {...props} to={to} />
}

export default Link
