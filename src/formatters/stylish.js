import _ from 'lodash';

const spacesCount = 2;

const findValue = (currentValue, depth = 1) => {
  const indentSize = depth * spacesCount;
  const currentIndent = ' '.repeat(indentSize + 2);
  const bracketIndent = ' '.repeat(indentSize - spacesCount);

  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${findValue(val, depth + 2)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
}

const composeAnswer = (line, depth, indentSize, currentIndent) => {
    if (line.type === 'nested') {
      return `${' '.repeat(indentSize + 1)} ${line.key}: ${stylish(line.children, depth + 2)}`;
    } else if (line.type === 'added') {
      return `${currentIndent}+ ${line.key}: ${findValue(line.value2, depth + 2)}`;
    } else if (line.type === 'deleted') {
      return `${currentIndent}- ${line.key}: ${findValue(line.value1, depth + 2)}`;
    } 
    return (line.type === 'changed') ? [
      `${currentIndent}- ${line.key}: ${findValue(line.value1, depth + 2)}`,
      `${currentIndent}+ ${line.key}: ${findValue(line.value2, depth + 2)}`,
    ] 
    : `${currentIndent}  ${line.key}: ${findValue(line.value1, depth + 2)}`;
}

const stylish = (data, depth = 1) => {
  const indentSize = depth * spacesCount;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - spacesCount);

  const lines = data.flatMap((line) => {
    return composeAnswer(line, depth, indentSize, currentIndent)
  });

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;