import LinkResponse from './LinkResponse'

type EventResponse = {
    Body: string
    EndDate: string
    EndTime: string
    Image: string
    ImageAlt: string
    Links: LinkResponse[]
    Name: string
    Slug: string
    StartDate: string
    StartTime: string
}

export default EventResponse
