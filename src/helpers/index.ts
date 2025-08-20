export const addOneDayToDate = (value: Date): Date => {
  const date = new Date(value);
  date.setDate(date.getDate() + 1);
  return date;
};

export const subtractOneDayFromDate = (value: Date): Date => {
  const date = new Date(value);
  date.setDate(date.getDate() - 1);
  return date;
};
