import yaml from 'js-yaml';

const getParser = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(data);
  }
  return `Error! Unknown format - ${format}`;
};

export default getParser;
