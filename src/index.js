import path from 'path';
import fs from 'fs';
import parser from './parsers.js';
import findDiff from './findDiff.js';
import formatSelection from '../src/formatters/formatSelection.js';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parser(getData(filepath1), getFormat(filepath1));
  const file2 = parser(getData(filepath2), getFormat(filepath2));

  return formatSelection(findDiff(file1, file2), format);
};

export default genDiff;