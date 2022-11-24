import stylish from './stylish.js';
import plain from './plain.js';

const formatSelection = (data, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(data);
  }
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return JSON.stringify(data);
  }
  return (`Error! Unknown format - ${format}`);
};

export default formatSelection;
