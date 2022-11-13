import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), filepath1)),
  );
  const obj2 = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), filepath2)),
  );
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

  const findDifferences = (acc, key) => {
    if (obj1Keys.includes(key) && obj2Keys.includes(key)) {
      return obj1[key] === obj2[key] ? [...acc, `   ${key}: ${obj1[key]}`] : [...acc, ` - ${key}: ${obj1[key]}`, ` + ${key}: ${obj2[key]}`];
    }
    return obj1Keys.includes(key) ? [...acc, ` - ${key}: ${obj1[key]}`] : [...acc, ` + ${key}: ${obj2[key]}`];
  };
  const result = keys.reduce(findDifferences, []);
  return `{\n${result.join('\n')}\n`;
};
export default genDiff;
