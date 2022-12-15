import { jest } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtures = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
const resultJson = readFixtures('resultJson.js')

describe('genDiff App', () => {
    test('should be work with json', () => {
      expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual('{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}');
    });
});