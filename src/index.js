import path from 'path';
import fs from 'fs';
import getParser from './parsers.js';
import getDiff from './getDiff.js';
import formatSelection from './formatters/formatSelection.js';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getParser(getData(filepath1), getFormat(filepath1));
  const file2 = getParser(getData(filepath2), getFormat(filepath2));

  return formatSelection(getDiff(file1, file2), format);
};

export default genDiff;
