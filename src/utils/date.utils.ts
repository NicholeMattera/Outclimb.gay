export class DateUtil {
    static getDayOfWeek(day: number): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return days[day]
    }

    static get12Hour(hour: number): { hour: number; period: string } {
        const result = {
            hour,
            period: 'am',
        }

        if (hour === 0) {
            result.hour = 12
        } else if (hour === 12) {
            result.period = 'pm'
        } else if (hour > 12) {
            result.hour = result.hour - 12
            result.period = 'pm'
        }

        return result
    }

    static getMonth(month: number): string {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        return months[month]
    }

    static getOrdinalSuffix(num: number): string {
        const j = num % 10
        const k = num % 100

        if (j == 1 && k != 11) {
            return 'st'
        }

        if (j == 2 && k != 12) {
            return 'nd'
        }

        if (j == 3 && k != 13) {
            return 'rd'
        }

        return 'th'
    }

    static formatLongDate(date: Date): string {
        const day = this.getDayOfWeek(date.getDay())
        const month = this.getMonth(date.getMonth())
        const dateOrdinalSuffix = this.getOrdinalSuffix(date.getDate())

        return `${day} ${month} ${date.getDate()}${dateOrdinalSuffix}`
    }

    static formatLongTime(date: Date): string {
        const { hour, period } = this.get12Hour(date.getHours())
        const minute = date.getMinutes()

        return `${hour}:${minute}${period}`
    }
}
