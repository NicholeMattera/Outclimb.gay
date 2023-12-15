const data = require('./bouldering_meetup.json')
const mysql = require('mysql2')
const process = require('node:process')

function findFirstAndThirdThursday() {
    const now = new Date()
    const firstThursday = new Date(now.getFullYear(), now.getMonth() + 1)
    for (let i = 1; i < 7; i++) {
        if (firstThursday.getDay() === 4) break
        firstThursday.setDate(firstThursday.getDate() + 1)
    }

    return [
        firstThursday,
        new Date(firstThursday.getFullYear(), firstThursday.getMonth(), firstThursday.getDate() + 14),
    ]
}

function formatSqlDateWithTime(day, time) {
    const year = day.getFullYear()
    const month = day.getMonth() + 1 < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1
    const date = day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()

    return `${year}-${month}-${date} ${time}`
}

function formatSlugDate(day) {
    const year = day.getFullYear()
    const month = day.getMonth() + 1 < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1
    const date = day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()

    return `${year}${month}${date}`
}

function mysqlConnect(connection) {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err)
                return
            }

            resolve()
        })
    })
}

function mysqlQuery(connection, query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) {
                reject(err)
                return
            }

            resolve(results.length == 1 ? results[0] : results)
        })
    })
}

;(async () => {
    if (
        !process.env.OUTCLIMB_DB_USER ||
        !process.env.OUTCLIMB_DB_PASSWORD ||
        !process.env.OUTCLIMB_DB_HOST ||
        !process.env.OUTCLIMB_DB_NAME
    ) {
        console.log('Error: Missing required environment variable(s)')
        return
    }

    const connection = mysql.createConnection({
        host: process.env.OUTCLIMB_DB_HOST,
        user: process.env.OUTCLIMB_DB_USER,
        password: process.env.OUTCLIMB_DB_PASSWORD,
        database: process.env.OUTCLIMB_DB_NAME,
        insecureAuth: true,
    })
    try {
        await mysqlConnect(connection)
        console.log('Log: Connected to MySQL database')

        for (const day of findFirstAndThirdThursday()) {
            const slug = `${formatSlugDate(day)}${data.slug}`
            const { numOfEvents } = await mysqlQuery(
                connection,
                'SELECT COUNT(*) as "numOfEvents" FROM `events` WHERE `slug` = ?',
                [slug],
            )

            if (numOfEvents !== 0) {
                console.log(`Warning: Skipping event for ${day} as it already exists`)
                continue
            }

            const imageIndex = Math.floor(Math.random() * data.images.length)

            const { insertId } = await mysqlQuery(
                connection,
                'INSERT INTO `events` VALUES (NULL, ?, ?, CONVERT_TZ(?,"US/Central","UTC"), CONVERT_TZ(?,"US/Central","UTC"), ?, ?, ?, ?, 0)',
                [
                    data.categoryId,
                    data.body,
                    formatSqlDateWithTime(day, '21:00:00'),
                    formatSqlDateWithTime(day, '19:00:00'),
                    data.images[imageIndex].url,
                    data.images[imageIndex].alt,
                    data.name,
                    slug,
                ],
            )
            console.log(`Log: Created event for ${day}`)

            await mysqlQuery(connection, 'INSERT INTO `links` VALUES (null, ?, ?, 0, NULL, ?)', [
                insertId,
                data.link.name,
                data.link.url,
            ])
            console.log(`Log: Created waiver link for event on ${day}`)
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }

    connection.end()
})()
