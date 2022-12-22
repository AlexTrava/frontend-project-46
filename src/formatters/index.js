import stylish from './stylish.js';

const formatter = (tree, format) => {
    switch(format) {
        case 'stylish':
            return stylish(tree);
        case 'json':
            return JSON.stringify(tree);
        default:
            throw new Error(`Format name ${format} if wrong.`)
    }
};

export default formatter