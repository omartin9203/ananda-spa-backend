
export const fixSelectors = (obj: any, isId = false) => {
  const result = {};
  Object.getOwnPropertyNames(obj)
    .filter(x => ![undefined, null].some(t => t === Object.getOwnPropertyDescriptor(obj, x).value))
    .forEach(x => result[`$${x}`] = x === 'regex' ? getRegexFromString(obj[x] as string) : obj[x]);
  return result;
};

export const getRegexFromString = (x: string) => {
  const fixedStr = x.replace('.', '\.').replace(' ', '|');
  return RegExp(fixedStr, 'si');
};
