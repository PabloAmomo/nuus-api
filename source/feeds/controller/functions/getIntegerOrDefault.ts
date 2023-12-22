const getIntegerOrDefault = (value: string | number, defValue: number): number => {
  if (typeof value === 'number') return value;
  return Number.isNaN(parseInt(value)) ? defValue : parseInt(value);
};

export { getIntegerOrDefault };