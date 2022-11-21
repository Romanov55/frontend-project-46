import findDiff from './findDiff.js';
import parser from './parsers.js';

const genDiff = (file1, file2) => {
  const data1 = parser(file1);
  const data2 = parser(file2);

  return findDiff(data1, data2);
};

export default genDiff;
