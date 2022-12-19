import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import getComparisonResult from './buildTree.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);
const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFile = (filepath) => parse(readFileSync(filepath), getFormat(filepath));

const genDiff = (filepath1, filepath2) => {
  const file1 = getFile(buildFullPath(filepath1));
  const file2 = getFile(buildFullPath(filepath2));
  return getComparisonResult(file1, file2);
};

export default genDiff;
