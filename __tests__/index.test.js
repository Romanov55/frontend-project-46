#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'stylish', 'trueResultStylish.txt'],
  ['file1.json', 'file2.json', undefined, 'trueResultStylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'trueResultStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'trueResultPlain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'trueResultPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'trueResultJson.txt'],
  ['file1.yml', 'file2.yml', 'json', 'trueResultJson.txt'],
])('test message', (filename1, filename2, formatName, expectedName) => {
  const file1 = getFixturePath(filename1);
  const file2 = getFixturePath(filename2);
  const expected = fs.readFileSync(getFixturePath(expectedName), 'utf8');

  expect(genDiff(file1, file2, formatName)).toEqual(expected);
});
