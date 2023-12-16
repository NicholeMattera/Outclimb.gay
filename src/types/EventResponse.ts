import LinkResponse from './LinkResponse'

type EventResponse = {
    body: string
    endTime: number
    image: string
    image2x: string
    smallImage: string
    smallImage2x: string
    imageAlt: string
    links: LinkResponse[]
    name: string
    slug: string
    startTime: number
}

export default EventResponse
