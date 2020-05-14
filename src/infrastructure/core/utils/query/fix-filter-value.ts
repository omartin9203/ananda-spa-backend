import * as mongoose from 'mongoose';

export const fixIdValue = (value: any) => {
  Object.keys(value).forEach(x => {
    if (x === '$eq') { value[x] = mongoose.Types.ObjectId(value[x]); }
    if (x === '$in') { value[x] = (value[x] as string[]).map(y => mongoose.Types.ObjectId(y)); }
  });
  return value;
};
