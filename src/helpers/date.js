export const isCurrentDateBetween = (start, end, date) => {
  const s = new Date(start)
  const e = new Date(end)
  const n = date ? new Date(date) : new Date()

  return s.getTime() <= n.getTime() && n.getTime() < e.getTime()
}

export const isDateBetween = (start, end, date) => {
  return isCurrentDateBetween(start, end, date)
}

export const isDateNext = start => {
  const s = new Date(start)
  const n = new Date()

  return s.getTime() >= n.getTime()
}

export const isDateEqual = (date1, date2) => {
  return date1.toISOString() === date2.toISOString()
}
