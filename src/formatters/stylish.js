import _ from 'lodash';

const spaceCount = 2;

const stringify = (file, depth = 1) => {
  const indentSize = depth * spaceCount;
  const currentIndent = ' '.repeat(indentSize + 2);
  const bracketIndent = ' '.repeat(indentSize - spaceCount);

  if (!_.isObject(file)) {
    return `${file}`;
  }
  const output = Object.entries(file)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 2)}`);
  return ['{', ...output, `${bracketIndent}}`].join('\n');
};

const stylish = (tree, depth = 1) => {
  const indentSize = depth * spaceCount;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - spaceCount);

  const lines = tree.flatMap((node) => {
    const { key, value, type } = node;
    switch (type) {
      case 'nested': {
        return `${' '.repeat(indentSize + 1)} ${key}: ${stylish(node.children, depth + 2)}`;
      }
      case 'added': {
        return `${currentIndent}+ ${key}: ${stringify(value, depth + 2)}`;
      }
      case 'removed': {
        return `${currentIndent}- ${key}: ${stringify(value, depth + 2)}`;
      }
      case 'unchanged': {
        return `${currentIndent}  ${key}: ${stringify(value, depth + 2)}`;
      }
      case 'changed': {
        const beforeChanged = `${currentIndent}- ${key}: ${stringify(node.value1, depth + 2)}`;
        const afterChanged = `${currentIndent}+ ${key}: ${stringify(node.value2, depth + 2)}`;
        return [beforeChanged, afterChanged];
      }
      default:
        throw new Error(`Unknown type - ${type}.`);
    }
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default stylish;
