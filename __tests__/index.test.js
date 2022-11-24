
#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const file1yml = getFixturePath('file1.yml');
const file2yml = getFixturePath('file2.yml');

const expected1 = fs.readFileSync(getFixturePath('testExpectedStylish.txt'), 'utf8');
const expected2 = fs.readFileSync(getFixturePath('testExpectedPlain.txt'), 'utf8');
const expected3 = fs.readFileSync(getFixturePath('testExpectedJson.txt'), 'utf8');

test('stylish', () => {
  expect(genDiff(file1, file2, 'stylish')).toEqual(expected1);
  expect(genDiff(file1, file2)).toEqual(expected1);
  expect(genDiff(file1yml, file2yml, 'stylish')).toEqual(expected1);
});

test('plain', () => {
  expect(genDiff(file1, file2, 'plain')).toEqual(expected2);
  expect(genDiff(file1yml, file2yml, 'plain')).toEqual(expected2);
});

test('json', () => {
  expect(genDiff(file1, file2, 'json')).toEqual(expected3);
  expect(genDiff(file1yml, file2yml, 'json')).toEqual(expected3);
});