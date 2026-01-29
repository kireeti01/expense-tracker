export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export const formatDateForInput = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}