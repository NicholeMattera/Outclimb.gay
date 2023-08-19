import axios from 'axios'
import EventResponse from 'types/EventResponse'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

async function loadEvent(slug: string) {
    const { data } = await axios.get<EventResponse>(`/api/v1/events/${slug}`)
    return data
}

async function loadEvents() {
    const { data } = await axios.get<EventResponse[]>('/api/v1/events')
    return data
}

function useEventStore() {
    const FetchEvent = function (slug: string) {
        return useQuery<EventResponse, Error>(['events', slug], () => loadEvent(slug))
    }

    const FetchEvents = function () {
        return useQuery<EventResponse[], Error>(['events'], loadEvents)
    }

    const GetEvent = function (slug: string) {
        const { data, error, status } = FetchEvent(slug)

        return {
            error,
            event: data,
            status,
        }
    }

    const GetEvents = function () {
        const { data, error, status } = FetchEvents()

        return {
            error,
            events: data,
            status,
        }
    }

    const GetUpcomingEvent = function () {
        const { data, error, status } = FetchEvents()

        const event = useMemo(() => {
            if (status === 'success') {
                const now = new Date().getTime()
                return (
                    data.find((event: EventResponse) => {
                        return event.startTime > now
                    }) || data[data.length - 1]
                )
            }
        }, [data, status])

        return {
            error,
            event,
            status,
        }
    }

    return {
        GetEvent,
        GetEvents,
        GetUpcomingEvent,
    }
}

export default useEventStore
