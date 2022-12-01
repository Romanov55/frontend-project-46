import path from 'path';
import fs from 'fs';
import getParser from './src/parsers.js';
import getDiff from './src/getDiff.js';
import formatSelection from './src/formatters/index.js';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getParser(getData(filepath1), getFormat(filepath1));
  const file2 = getParser(getData(filepath2), getFormat(filepath2));

  return formatSelection(getDiff(file1, file2), format);
};

export default genDiff;
