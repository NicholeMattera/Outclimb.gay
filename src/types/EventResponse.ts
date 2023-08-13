import LinkResponse from './LinkResponse'

type EventResponse = {
    body: string
    endTime: number
    image: string
    imageAlt: string
    links: LinkResponse[]
    name: string
    slug: string
    startTime: number
}

export default EventResponse
