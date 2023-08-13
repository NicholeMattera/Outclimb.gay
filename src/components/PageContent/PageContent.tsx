import './PageContent.scss'
import React from 'react'

function PageContent({ children }: { children?: React.ReactNode }) {
    return <main className="page-content">{children}</main>
}

export default PageContent
