import { expect, test, describe } from '@jest/globals';
// import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import expectedJson from '../__fixtures__/expectedJson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFixtures = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
// const resultJson = readFixtures('expectJson.txt')

describe('genDiff App', () => {
  test('should be work with json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedJson);
  });
});
