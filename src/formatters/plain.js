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
        acc.push(`${plain(item.children, key)}`);
        break;
      case 'added':
        acc.push(`Property '${key}' was added with value: ${getString(item.value2)}`);
        break;
      case 'deleted':
        acc.push(`Property '${key}' was removed`);
        break;
      case 'changed':
        acc.push(`Property '${key}' was updated. From ${getString(item.value1)} to ${getString(item.value2)}`);
        break;
      default:
        break;
    }
    return acc;
  }
  return data.reduce(lines, []).join('\n');
};

export default plain;
