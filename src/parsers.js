import yaml from 'js-yaml';
import * as path from 'node:path';
import { readFileSync } from 'node:fs';

const parser = (filepath) => {
  const format = path.extname(filepath);
  const data = readFileSync(filepath, 'utf8');
  if (format === 'json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parser;
