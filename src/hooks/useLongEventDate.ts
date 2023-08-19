import DateUtil from 'utils/date.utils'
import EventResponse from 'types/EventResponse'
import { useMemo } from 'react'

function useLongEventDate(event: EventResponse | undefined, status: string) {
    return useMemo(() => {
        if (status === 'success' && event) {
            const startDate = new Date(event.startTime)
            const formattedStartDate = DateUtil.formatLongDate(startDate)
            const formattedStart = `${formattedStartDate} • ${DateUtil.formatLongTime(startDate)}`

            if (event.endTime !== 0) {
                const endDate = new Date(event.endTime)
                const formattedEndDate = DateUtil.formatLongDate(endDate)
                const formattedEndTime = DateUtil.formatLongTime(endDate)

                if (formattedStartDate === formattedEndDate) {
                    return `${formattedStart} - ${formattedEndTime}`
                } else {
                    return `${formattedStart} - ${formattedEndDate} • ${formattedEndTime}`
                }
            } else {
                return formattedStart
            }
        }

        return ''
    }, [event, status])
}

export default useLongEventDate
