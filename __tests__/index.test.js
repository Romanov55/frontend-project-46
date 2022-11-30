#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  [file1, file2, 'stylish', expected1],
  [file1, file2, expected1],
  [file1yml, file2yml, 'stylish', expected1],
  [file1, file2, 'plain', expected2],
  [file1yml, file2yml, 'stylish', expected2],
  [file1, file2, 'json', expected3],
  [file1yml, file2yml, 'json', expected3],
])('test message', (filename1, filename2, formatName, expectedName) => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const file1yml = getFixturePath('file1.yml');
    const file2yml = getFixturePath('file2.yml');

    const expected1 = fs.readFileSync(getFixturePath('trueResultStylish.txt'), 'utf8');
    const expected2 = fs.readFileSync(getFixturePath('trueResultPlain.txt'), 'utf8');
    const expected3 = fs.readFileSync(getFixturePath('trueResultJson.txt'), 'utf8');
  expect(genDiff(filename1, filename2, formatName)).toEqual(expectedName);
});

// test('stylish', () => {
//   expect(genDiff(file1, file2, 'stylish')).toEqual(expected1);
//   expect(genDiff(file1, file2)).toEqual(expected1);
//   expect(genDiff(file1yml, file2yml, 'stylish')).toEqual(expected1);
// });

// test('plain', () => {
//   expect(genDiff(file1, file2, 'plain')).toEqual(expected2);
//   expect(genDiff(file1yml, file2yml, 'plain')).toEqual(expected2);
// });

// test('json', () => {
//   expect(genDiff(file1, file2, 'json')).toEqual(expected3);
//   expect(genDiff(file1yml, file2yml, 'json')).toEqual(expected3);
// });
