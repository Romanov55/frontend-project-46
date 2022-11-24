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

const keyPath = (path, el) => {
  return path === '' ? `${el.key}` : `${path}.${el.key}`
}

const plain = (data, path = '') => {
  const lines = data.flatMap((el) => {
    const key = keyPath(path, el);
    const type = el.type;
    const children = el.children;
    const firstValue = el.value1;
    const secondValue = el.value2;

    if (type === 'nested') {
      return `${plain(children, key)}`;
    } else if (type === 'added') {
      return `Property '${key}' was added with value: ${findValue(secondValue)}`;
    } else if (type === 'deleted') {
      return `Property '${key}' was removed`;
    } 
    return type === 'changed' 
      ? `Property '${key}' was updated. From ${findValue(firstValue)} to ${findValue(secondValue)}`
      : '';
  });

  return lines.filter((e) => e !== '').join('\n');
};

export default plain;