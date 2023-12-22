const filterNumberStrings = (value: string[]): string[] => {
  return value.filter(item => !Number.isNaN(parseInt(item)));
};

export { filterNumberStrings };