// Time

export const formatMinutes = (minutes) => {
  if (minutes < 1) {
    return '';
  }

  const hours = Math.floor(minutes / 60) || '';
  const restMinutes = Math.floor(minutes % 60) || '';

  const hoursSign = hours ? 'h' : '';
  const minutesSign = restMinutes ? 'm' : '';

  return `${hours}${hoursSign} ${restMinutes}${minutesSign}`;
};

// Object

export const invertObjectKeys = (object) => {
  const entries = Object.entries(object);
  const invertedEntries = entries.map(([key, value]) => [value, key]);

  return Object.fromEntries(invertedEntries);
};
