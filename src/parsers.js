import yaml from 'js-yaml';

const getParser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      return `Error! Unknown format - ${format}`;
  }
};

export default getParser;
