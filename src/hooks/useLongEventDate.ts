import { useEffect, useState } from 'react'
import DateUtil from 'utils/date.utils'
import EventResponse from 'types/EventResponse'

function useLongEventDate(event: EventResponse | undefined, status: string) {
    const [longEventDate, setLongEventDate] = useState('')
    useEffect(() => {
        if (status === 'success' && event) {
            const startDate = new Date(event.startTime)
            const formattedStartDate = DateUtil.formatLongDate(startDate)
            const formattedStart = `${formattedStartDate} • ${DateUtil.formatLongTime(startDate)}`

            if (event.endTime !== 0) {
                const endDate = new Date(event.endTime)
                const formattedEndDate = DateUtil.formatLongDate(endDate)
                const formattedEndTime = DateUtil.formatLongTime(endDate)

                if (formattedStartDate === formattedEndDate) {
                    setLongEventDate(`${formattedStart} - ${formattedEndTime}`)
                } else {
                    setLongEventDate(`${formattedStart} - ${formattedEndDate} • ${formattedEndTime}`)
                }
            } else {
                setLongEventDate(formattedStart)
            }
        }
    }, [event, status])

    return longEventDate
}

export default useLongEventDate
