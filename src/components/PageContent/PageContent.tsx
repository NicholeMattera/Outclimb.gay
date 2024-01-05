import './PageContent.scss'
import React from 'react'

type PageContentProps = {
    children?: React.ReactNode
    title?: string
}

function PageContent({ children, title }: PageContentProps) {
    return (
        <main className="page-content" id="main">
            {title && <h1 className="page-content__title">{title}</h1>}

            {children}
        </main>
    )
}

export default PageContent
