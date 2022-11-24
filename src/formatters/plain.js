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

const isTypeNested = (type) => {
  if (type  === 'nested') {
    return true
  }
}

const isTypeAdded = (type) => {
  if (type === 'added') {
    return true
  }
}

const plain = (data, path = '') => {
  const lines = data.flatMap((el) => {
    const keyPath = (path === '' ? `${el.key}` : `${path}.${el.key}`);

    if (isTypeNested(el.type)) {
      return `${plain(el.children, keyPath)}`;
    } else if (isTypeAdded) {
      return `Property '${keyPath}' was added with value: ${findValue(el.value2)}`;
    } else if (el.type === 'deleted') {
      return `Property '${keyPath}' was removed`;
    } 
    return el.type === 'changed' 
      ? `Property '${keyPath}' was updated. From ${findValue(el.value1)} to ${findValue(el.value2)}`
      : '';
  });

  return lines.filter((e) => e !== '').join('\n');
};

export default plain;