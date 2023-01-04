import _ from 'lodash';

const getType = (node) => node.type;
const getKey = (node) => node.key;
const getValue = (node) => node.value;
const getChildren = (node) => node.children;

const stringify = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (_.isString(currentValue)) {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const getFullName = (parentName, name) => [...parentName, name].join('.');

const plain = (tree) => {
  const iter = (node, parentName = []) => {
    const result = node
      .filter((data) => data.type !== 'unchanged')
      .map((data) => {
        const type = getType(data);
        const key = getKey(data);
        const value = getValue(data);
        const children = getChildren(data);
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
            return iter(children, [newParentName]);
          }
          default:
            throw new Error(`Node type - ${type} is not defined`);
        }
      });
    return `${result.join('\n')}`;
  };
  return iter(tree);
};

export default plain;
