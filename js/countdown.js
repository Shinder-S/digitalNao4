const nextYear = (new Date()).getFullYear() + 1
const nextYearDate = new Date(nextYear, 0, 1)

// Time calculations for days, hours, minutes and seconds

// Find the distance between now and the count down date
setInterval(() => {
  const todayDate = new Date()
  const secDiff = Math.floor((nextYearDate.getTime() - todayDate.getTime()) / 1000)
  const days = Math.floor((secDiff / (60 * 60)) / 24)
  const hours = Math.floor(secDiff / (60 * 60)) % 24
  const minutes = Math.floor(secDiff / 60) % 60
  const seconds = Math.floor(secDiff) % 60

  dayElement.innerText = days
  hourElement.innerText = hours
  minElement.innerText = minutes
  secElement.innerText = seconds
}, 1000)