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

const keyPath = (path, line) => (path === '' ? `${line.key}` : `${path}.${line.key}`);

const plain = (data, path = '') => {
  const lines = data.flatMap((line) => {
    const key = keyPath(path, line);

    switch (line.type) {
      case 'nested':
        return `${plain(line.children, key)}`;
      case 'added':
        return `Property '${key}' was added with value: ${getString(line.value2)}`;
      case 'deleted':
        return `Property '${key}' was removed`;
      case 'changed':
        return `Property '${key}' was updated. From ${getString(line.value1)} to ${getString(line.value2)}`;
      default:
        return '';
    }
  });

  return lines.filter((e) => e !== '').join('\n');
};

export default plain;
