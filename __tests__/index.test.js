#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import findDiff from '../src/index.js';

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

test('stylish', () => {
  expect(findDiff(file1, file2, 'stylish')).toEqual(expected1);
  expect(findDiff(file1, file2)).toEqual(expected1);
  expect(findDiff(file1yml, file2yml, 'stylish')).toEqual(expected1);
});

test('plain', () => {
  expect(findDiff(file1, file2, 'plain')).toEqual(expected2);
  expect(findDiff(file1yml, file2yml, 'plain')).toEqual(expected2);
});

test('json', () => {
  expect(findDiff(file1, file2, 'json')).toEqual(expected3);
  expect(findDiff(file1yml, file2yml, 'json')).toEqual(expected3);
});