import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'json':
      return JSON.stringify(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Format name ${format} if wrong.`);
  }
};

export default formatter;
