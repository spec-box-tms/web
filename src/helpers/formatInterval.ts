export const formatInterval = (interval: number): string => {
  interval = interval / 1000;

  if(interval > 3600) {
    return `${Math.floor(interval / 3600)} ч ${Math.floor((interval % 3600) / 60)} мин`;
  }
  if(interval > 60) {
    return `${Math.floor(interval / 60)} мин ${Math.floor(interval % 60)} с`;
  }

  return `${Math.floor(interval)} с`;
};
