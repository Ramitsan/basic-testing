// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByTimeout /*doStuffByInterval */,
} from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(jest.fn(), 1000);
    expect(spy.mock.calls.length).toBe(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
  });
});

jest.mock('fs/promises', () => {
  return {
    readFile: async (path: string) => {
      expect(path).toBe('correctPath');
      return 'data';
    },
  };
});

jest.mock('fs', () => {
  return {
    existsSync: (path: string) => {
      return path === 'correctPath';
    },
  };
});

let isJoinCalled = false;

jest.mock('path', () => {
  return {
    join: (...paths: string[]) => {
      isJoinCalled = true;
      expect(typeof paths[1]).not.toBe('undefined');
      return paths[1];
    },
  };
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    await readFileAsynchronously('correctPath'); // returns promise
    expect(isJoinCalled).toBe(true);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const result = await readFileAsynchronously('wrongPath');
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const result = await readFileAsynchronously('correctPath');
    expect(result).toBe('data');
  });
});
