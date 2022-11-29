#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const file1yml = getFixturePath('file1.yml');
const file2yml = getFixturePath('file2.yml');

const expected1 = fs.readFileSync(getFixturePath('trueResultStylish.txt'), 'utf8');
const expected2 = fs.readFileSync(getFixturePath('trueResultPlain.txt'), 'utf8');
const expected3 = fs.readFileSync(getFixturePath('trueResultJson.txt'), 'utf8');

test.each([
  {a: file1, b: file2, c: 'stylish', expected1},
  {a: file1, b: file2, expected1},
  {a: file1yml, b: file2yml, c: 'stylish', expected1},
  {a: file1, b: file2, c: 'plain', expected2},
  {a: file1yml, b: file2yml, c: 'stylish', expected2},
  {a: file1, b: file2, c: 'json', expected3},
  {a: file1yml, b: file2yml, c: 'json', expected3},
])('stylish', ({a, b, c, expected}) => {
  expect(genDiff(a, b, c)).toBe(expected);
});
