import _ from 'lodash';

const getKey = (node) => node.key;
const getValue = (node) => node.value;
const getChildren = (node) => node.children;
const getType = (node) => node.type;
const spaceCount = 4;

const indent = (depth, ident = 0) => ' '.repeat((depth * spaceCount) + ident);

const stringify = (file, depth) => {
  if (!_.isObject(file)) {
    return String(file);
  }
  const output = Object.entries(file).map(([key, value]) => `${indent(depth)}${key}: ${stringify(value, (depth + 1))}`);
  return ['{', ...output, `${indent(depth - 1)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const lines = node.map((object) => {
      const type = getType(object);
      switch (type) {
        case 'added': {
          const key = getKey(object);
          const value = getValue(object);
          return `${indent(depth, -2)}+ ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'removed': {
          const key = getKey(object);
          const value = getValue(object);
          return `${indent(depth, -2)}- ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'unchanged': {
          const key = getKey(object);
          const value = getValue(object);
          return `${indent(depth)}${key}: ${stringify(value, depth + 1)}`;
        }
        case 'changed': {
          const key = getKey(object);
          const beforeChanged = `${indent(depth, -2)}- ${key}: ${stringify(object.value1, depth + 1)}`;
          const afterChanged = `${indent(depth, -2)}+ ${key}: ${stringify(object.value2, depth + 1)}`;
          return [beforeChanged, afterChanged];
        }
        case 'nested': {
          const key = getKey(object);
          const children = getChildren(object);
          return `${indent(depth)}${key}: ${stringify(iter(children, depth + 1), depth + 1)}`;
        }
        default:
          throw new Error(`Unknown type - ${type}.`);
      }
    });
    return ['{', ...lines.flat(), `${indent(depth - 1)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
