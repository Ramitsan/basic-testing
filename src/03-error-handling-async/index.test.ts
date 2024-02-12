// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    const value = await resolveValue(123);
    expect(value).toBe(123);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    expect(() => throwError('message')).toThrowError('message');
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    try {
      throwError();
      throw new Error('should throw error');
    } catch (err) {
      expect((err as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    try {
      throwCustomError();
      throw new Error('should throw error');
    } catch (err) {
      expect(err).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    try {
      await rejectCustomError();
      throw new Error('should throw error');
    } catch (err) {
      expect(err).toBeInstanceOf(MyAwesomeError);
    }
  });
});
