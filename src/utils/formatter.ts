export const formatNumber = (num: number): string => {
  return num.toLocaleString('vi-VN')
}

export const formatDateTimeStamp = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
