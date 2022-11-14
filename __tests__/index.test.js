import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (file) => path.join(__dirname, '../__fixtures__', file);

test('differences', () => {
  const resultStylish = readFileSync(getPath('stylishResult.txt'), 'utf-8').replaceAll('\r', '');

  const JSON1Path = getFixturePath('file1.json');
  const JSON2Path = getFixturePath('file2.json');
  const JSONgenDiff = genDiff(JSON1Path, JSON2Path);
  expect(JSONgenDiff).toEqual(resultStylish);
});

