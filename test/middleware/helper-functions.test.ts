import {describe, expect, test} from '@jest/globals';
import { normalize } from '../../src/middleware/helper-functions';

describe('Helper Functions', () => {
    test('Normalize', () => {
        expect(normalize([1, 2, 3], 4)).toBe(1);
    });
});