import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormat = (data, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(data)
  }
  if (format === 'plain') {
    return plain(data)
  }
  if (format === 'json') {
    return JSON.stringify(data)
  }
};

export default chooseFormat;