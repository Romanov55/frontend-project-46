import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const expected = readFile('trueResult.txt');

const filepath3 = getFixturePath('file1.yml');
const filepath4 = getFixturePath('file2.yml');

test('genDiff', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

test('genDiff', () => {
  expect(genDiff(filepath3, filepath4)).toEqual(expected);
});
