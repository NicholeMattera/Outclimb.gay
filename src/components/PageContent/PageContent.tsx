import React from 'react'

import './PageContent.scss'

function PageContent({ children }: { children?: React.ReactNode }) {
    return <main className="page-content">{children}</main>
}

export default PageContent
