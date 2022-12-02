import _ from 'lodash';

const sortKeys = (obj1, obj2) => _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

const getDiff = (obj1, obj2) => {
  const allKeys = sortKeys(obj1, obj2);

  const result = allKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: getDiff(obj1[key], obj2[key]), type: 'nested' };
    }
    if (!_.has(obj1, key)) {
      return { key, value2: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value1: obj1[key], type: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return { key, value1: obj1[key], value2: obj2[key], type: 'changed' }
    }
    return { key, value1: obj1[key], type: 'unchanged' };
  });

  return result;
};

export default getDiff;
