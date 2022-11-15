import { readFileSync } from 'fs';
import path from 'path';
import findDiff from './findDiff.js';

const readFile = (file) => {
  const fullPath = path.resolve(process.cwd(), file);
  const data = readFileSync(fullPath, 'utf-8');
  return data;
};

const genDiff = (file1, file2) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);

  const parseData1 = JSON.parse(data1);
  const parseData2 = JSON.parse(data2);
  return findDiff(parseData1, parseData2);
};

export default genDiff;
