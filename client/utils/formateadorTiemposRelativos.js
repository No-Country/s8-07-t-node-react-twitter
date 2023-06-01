const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = (timestamp) => {
  const _TIME = new Date(timestamp)
  return (Date.now() - _TIME.getTime()) / 1000
}
const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

export const getTimeAgo = timestamp => {
  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  const [hace, num, unity] = rtf.format(value, unit).split(" ")
  return num + unity.slice(0, 1)
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", { day: 'numeric', month: 'short', year: 'numeric' })
}
