import _ from 'lodash';

const findValue = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (typeof currentValue === 'string') {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const keyPath = (path, line) => (path === '' ? `${line.key}` : `${path}.${line.key}`);

const composeAnswer = (line, key) => {
  if (line.type === 'added') {
    return `Property '${key}' was added with value: ${findValue(line.value2)}`;
  } if (line.type === 'deleted') {
    return `Property '${key}' was removed`;
  }
  return line.type === 'changed'
    ? `Property '${key}' was updated. From ${findValue(line.value1)} to ${findValue(line.value2)}`
    : '';
};

const plain = (data, path = '') => {
  const lines = data.flatMap((line) => {
    const key = keyPath(path, line);

    if (line.type === 'nested') {
      return `${plain(line.children, key)}`;
    }
    return composeAnswer(line, key);
  });

  return lines.filter((e) => e !== '').join('\n');
};

export default plain;