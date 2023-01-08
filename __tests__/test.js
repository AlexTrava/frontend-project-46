import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import expectedJson from '../__fixtures__/expectedJson.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';
import expectedPlain from '../__fixtures__/expectedPlain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const formatList = ['json', 'yaml', 'yml'];

test.each(formatList)('genDiff %s', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);

  expect(genDiff(filePath1, filePath2)).toEqual(expectedStylish);
  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filePath1, filePath2, 'json')).toEqual(expectedJson);
});
