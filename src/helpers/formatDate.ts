export function formatDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;
}
