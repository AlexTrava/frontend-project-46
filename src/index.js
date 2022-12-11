import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parse.js';


const getFormat = (filepath) => path.extname(filepath).slice(1);
const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFile = (filepath) => parse(readFileSync(filepath), getFormat(filepath));

const path1 = buildFullPath("__fixtures__/file1.json");
const format1 = getFormat("__fixtures__/file1.json");
const file1 = getFile(path1);



console.log('format:', format1);
console.log('path', path1);
console.log('file', file1);
