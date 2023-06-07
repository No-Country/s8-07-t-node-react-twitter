const TIME_UNITS = [
  { unit: ' día', seconds: 86400 },
  { unit: 'h', seconds: 3600 },
  { unit: 'min', seconds: 60 },
  { unit: 's', seconds: 1 }
];

export const getTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  const timeDiff = now.getTime() - date.getTime();

  if (timeDiff < 48 * 60 * 60 * 1000) {
    const secondsElapsed = Math.floor(timeDiff / 1000);

    if (secondsElapsed === 0) {
      return '0s'
    }

    for (const { unit, seconds } of TIME_UNITS) {
      if (secondsElapsed >= seconds || unit === 'seg') {
        const value = Math.floor(secondsElapsed / seconds);
        return `${value}${unit}`;
      }
    }
  } else {
    return date.toLocaleString('es-ES', { day: 'numeric', month: 'short' }) + ".";
  }
};

export function formatDate(dateString, short) {
  const date = new Date(dateString)
  const today = new Date()

  if (short) {
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth()) {
      return date.toLocaleTimeString("es-ES", { hour: 'numeric', minute: 'numeric' })
    } else {
      return date.toLocaleDateString("es-ES", { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' })
    }
  }

  return date.toLocaleDateString("es-ES", { day: 'numeric', month: 'long', year: 'numeric' })
}
