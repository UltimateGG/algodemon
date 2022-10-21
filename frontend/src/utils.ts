export const getTimestamp = (ms: number) => {
  const date = new Date(ms);
  const time = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');

  return `${getDate(ms)} at ${time}`;
}

export const getDate = (ms: number) => {
  let today = new Date(ms);
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

export const toDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const secondsLeft = seconds % 60;
  const minutesLeft = minutes % 60;
  const hoursLeft = hours % 24;

  if (days > 0) return days + 'd ';
  if (hoursLeft > 0) return hoursLeft + 'h ';
  if (minutesLeft > 0) return minutesLeft + 'm ';
  if (secondsLeft > 0) return secondsLeft + 's ';
}
