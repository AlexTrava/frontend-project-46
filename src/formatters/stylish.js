import _ from "lodash";


const getKey = (node) => node.key;
const getValue = (node) => node.value;
const getChildren = node => node.children;
const getType = node => node.type;
const spaceCount = 4;

const indent = (depth, ident = 0) => ' '.repeat((depth * spaceCount ) + ident);

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
            switch (type){
                case 'added': {
                    return `${indent(depth, -2)}+ ${getKey(object)}: ${stringify(getValue(object), depth + 1)}`;
                }
                case 'removed': {
                    return `${indent(depth, -2)}- ${getKey(object)}: ${stringify(getValue(object), depth + 1)}`;
                }
                case 'unchanged': {
                    return `${indent(depth)}${getKey(object)}: ${stringify(getValue(object), depth + 1)}`;
                }
                case 'changed': {
                    const beforeChanged = `${indent(depth, -2)}- ${getKey(object)}: ${stringify(object.value1, depth + 1)}`;
                    const afterChanged = `${indent(depth, -2)}+ ${getKey(object)}: ${stringify(object.value2, depth + 1)}`;
                    return [beforeChanged, afterChanged]; 
                }
                case 'nested': {
                    return `${indent(depth)}${getKey(object)}: ${stringify(iter(getChildren(object), depth + 1), depth + 1)}`;
                }
                default:
                    throw new Error (`Unknown type - ${type}.`)
            }
        });
        return ['{', ...lines.flat(), `${indent(depth - 1)}}`].join('\n');
    };
    return iter(tree, 1);
  };

  export default stylish;