import './PageContent.scss'
import React from 'react'

function PageContent({ children }: { children?: React.ReactNode }) {
    return (
        <main className="page-content" id="main">
            {children}
        </main>
    )
}

export default PageContent
