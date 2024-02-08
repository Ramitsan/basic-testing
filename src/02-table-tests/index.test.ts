// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases: Array<[{ a: any; b: any; action: any }, number | null]> = [
  [{ a: 1, b: 2, action: Action.Add }, 3],
  [{ a: 2, b: 2, action: Action.Add }, 4],
  [{ a: 3, b: 2, action: Action.Add }, 5],
  // continue cases for other actions
  [{ a: 3, b: 2, action: Action.Subtract }, 1],
  [{ a: 3, b: 2, action: Action.Multiply }, 6],
  [{ a: 3, b: 2, action: Action.Divide }, 1.5],
  [{ a: 3, b: 2, action: Action.Exponentiate }, 9],
  [{ a: 3, b: 2, action: '' }, null],
  [{ a: 'abc', b: 2, action: Action.Subtract }, null],
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  // test('should blah-blah', () => {
  //   expect(true).toBe(true);
  // });
  test.each(testCases)(
    'simpleCalculator(%s) should be %s',
    (value, expected) => {
      expect(simpleCalculator(value)).toEqual(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
