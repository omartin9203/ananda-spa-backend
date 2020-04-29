
export const fixSelectors = (obj: any) => {
  const result = {};
  Object.getOwnPropertyNames(obj)
    .filter(x => ![undefined, null].some(t => t === Object.getOwnPropertyDescriptor(obj, x).value))
    .forEach(x => result[`$${x}`] = x === 'regex' ? RegExp((obj[x] as string).replace('.', '\.').replace(' ', '|'), 'si') : obj[x]);
  return result;
}
