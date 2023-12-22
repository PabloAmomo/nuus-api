const scapeValue = (value: string): string => {
  return value.replace(/'/g, "\\'");
}

export { scapeValue };