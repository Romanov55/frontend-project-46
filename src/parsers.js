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
      throw `Error! Unknown format - ${format}`;
  }
};

export default getParser;
