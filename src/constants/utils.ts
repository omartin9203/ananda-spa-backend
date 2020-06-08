const PhoneFormat = require('phone-number-formats');

interface IPhoneFormatOptions {
  type: 'domestic' | 'international';
  separator?: '.' | '';
}
export const formatPhoneNumber = (x: string, options: IPhoneFormatOptions = { type: 'international' }): string => {
  return new PhoneFormat(x).format({ ...options, areaCode: '1' }).toString();
};

export const formatDecimal = (x: number, fractionDigits = 2) => {
  return x.toFixed(fractionDigits);
};

export const formatCurrency = (x: number,  symbol: '$' | '€' = '$', fractionDigits = 2) => {
  return `${symbol}${formatDecimal(x, fractionDigits)}`;
};
