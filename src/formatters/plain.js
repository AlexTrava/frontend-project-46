import _ from 'lodash';

const stringify = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (_.isString(currentValue)) {
    return `'${currentValue}'`;
  }
  return `${currentValue}`;
};

const getFullName = (parentName, name) => [...parentName, name].join('.');

const iter = (node, parentName = []) => node
  .filter((data) => data.type !== 'unchanged')
  .flatMap((data) => {
    const { key, value, type } = data;
    switch (type) {
      case 'added': {
        return `Property '${getFullName(parentName, key)}' was added with value: ${stringify(value)}`;
      }
      case 'removed': {
        return `Property '${getFullName(parentName, key)}' was removed`;
      }
      case 'changed': {
        const { value1, value2 } = data;
        return `Property '${getFullName(parentName, key)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      }
      case 'nested': {
        const newParentName = getFullName(parentName, key);
        return iter(data.children, [newParentName]);
      }
      default:
        throw new Error(`Node type - ${type} is not defined`);
    }
  });

const plain = (tree) => iter(tree).join('\n');

export default plain;
