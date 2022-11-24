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

const composeAnswer = (el, key) => {
  if (el.type === 'nested') {
    return `${plain(el.children, key)}`;
  } else if (el.type === 'added') {
    return `Property '${key}' was added with value: ${findValue(el.value2)}`;
  } else if (el.type === 'deleted') {
    return `Property '${key}' was removed`;
  } 
  return el.type === 'changed' 
    ? `Property '${key}' was updated. From ${findValue(el.value1)} to ${findValue(el.value2)}`
    : '';
}

const plain = (data, path = '') => {
  const lines = data.flatMap((el) => {
    const key = keyPath(path, el);

    return composeAnswer(el, key);
  });

  return lines.filter((e) => e !== '').join('\n');
};

export default plain;