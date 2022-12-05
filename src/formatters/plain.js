import _ from 'lodash';

const getString = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (typeof currentValue === 'string') {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const keyPath = (path, item) => (path === '' ? `${item.key}` : `${path}.${item.key}`);

const plain = (data, path = '') => {
  function lines(acc, item) {
    const key = keyPath(path, item);
    switch (item.type) {
      case 'nested':
        return acc + `${plain(item.children, key)}`;
      case 'added':
        return acc + `Property '${key}' was added with value: ${getString(item.value2)}\n`;
      case 'deleted':
        return acc + `Property '${key}' was removed\n`;
      case 'changed':
        return acc + `Property '${key}' was updated. From ${getString(item.value1)} to ${getString(item.value2)}\n`;
      default:
        return acc;
    }
  }
  return data.reduce(lines, '')
};

export default plain;
