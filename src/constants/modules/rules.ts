const required = (value: string) => !!value || 'Required';

const charactersLength = (min?: number, max?: number) => {
  return (v: string) => {
    if (!!min && !!v && v.length < min) { return `Min ${min} characters`; }
    if (!!max && !!v && v.length > max) { return `Max ${max} characters`; }
    return true;
  };
};
const emailValid = (v: string) => /.+@.+/.test(v) || 'Email must be valid';

const alphaNumeric = (v: string) =>
  /^[a-zA-Z0-9]+$/.test(v) || 'Only Alphanumeric characters are allowed';

const alpha = (v: string) =>
  /^[A-Za-z][A-Za-z ]*$/.test(v) || 'Only letters are allowed';

const numeric = (v: string) => /^[0-9]+$/.test(v) || 'Only digits are allowed';

const isPhoneNumber = (v: string) =>
  /^\+[0-9]+$/.test(v) || 'Only digits are allowed';

const isInValues = <T>(values: T[]) => {
  const res = (v: T) => !!values.find(x => x === v) || 'Not is a valid option';
  return res;
};

const notMatch = (match: string) => {
  return (value: string) => value === match || 'Not match';
};

const isGmail = (email: string) =>
  /^.+@gmail\.com$/.test(email) || 'Only gmail are allowed';

const isFormatNumber = (value: string) => regexFormatNumber.test(value);

const regexFormatNumber = /((\$ |\$)(\d+\.\d+|\d+))|((?<!\/)(\d+\.\d+|\d+)(( \$)|(\$)|(?= |$)))/;
// /((\$ |\$)(\d+\.\d+|\d+))|((\d+\.\d+|\d+)(( \$)|(\$))?)/;

const regexPhone = /(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?/;

export {
  required,
  charactersLength,
  emailValid,
  alphaNumeric,
  alpha,
  numeric,
  isInValues,
  notMatch,
  isGmail,
  isPhoneNumber,
  isFormatNumber,
  regexFormatNumber,
  regexPhone,
};
export default {
  required,
  charactersLength,
};
