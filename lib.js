const red = require('@f0c1s/color-red')
const green = require('@f0c1s/color-green')
const yellow = require('@f0c1s/color-yellow')
const blue = require('@f0c1s/color-blue')
const moment = require('moment-timezone')

const redBoundary = () => console.log(Array(60).fill(red('-')).join(''))

// Locations to the west of India, come early
// Locations to the east of India, come late
// To map the clocks from left to right in west to east fashion
const clocks = [
  'America/Los_Angeles',
  'Asia/Kolkata',
  'Asia/Singapore',
]

function showClock() {
  const HERE = moment(new Date()).tz('Asia/Kolkata')
  console.clear()
  redBoundary()
  console.log(`${HERE}; ${HERE.format()}`)
  redBoundary()
  console.log(Array(Number(HERE.format('ss'))).fill(blue('-')).join(''))
  const now = moment(new Date())
  const data = clocks.map(c => {
    const city = c.split('/')[1].replace(/_/g, ' ')
    const time = now.clone().tz(c)
    const hour = time.hour() === 12 ? 'Noon' : time.hour() === 0 ? 'MidNight' : time.format('HH')
    return {
      city,
      time: `${red(time.format('Do'))} ${yellow(hour)} ${green(time.format('mm'))}`,
      minutes: Array(Number(time.format('mm'))).fill(green('-')).join('')
    }
  })

  data.forEach(({ city, time, minutes }) => console.log(city.padStart(15, ' '), time, '\n', minutes))
  redBoundary()
}

function clock() {
  showClock()
  setInterval(showClock, 250)
}

module.exports = { clock }
