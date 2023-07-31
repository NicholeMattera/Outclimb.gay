import useSlots from 'hooks/useSlot'
import React from 'react'

import './PageContent.scss'

function PageContent({ children }: { children?: React.ReactNode }) {
    const slots = useSlots(children)

    return <main>{slots.default}</main>
}

export default PageContent
