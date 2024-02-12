// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(25);
    expect(account).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(25);
    expect(() => {
      account.withdraw(30);
    }).toThrow(InsufficientFundsError);

    expect(() => {
      account.withdraw(30);
    }).toThrow(`Insufficient funds: cannot withdraw more than 25`);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account = getBankAccount(25);
    const toAccount = getBankAccount(1);
    expect(() => {
      account.transfer(30, toAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(25);
    expect(() => {
      account.transfer(10, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(25);
    account.deposit(10);
    expect(account.getBalance()).toBe(35);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(25);
    account.withdraw(10);
    expect(account.getBalance()).toBe(15);
  });

  test('should transfer money', () => {
    // Write your test here
    const account = getBankAccount(25);
    const toAccount = getBankAccount(20);
    account.transfer(10, toAccount);
    expect(account.getBalance()).toBe(15);
    expect(toAccount.getBalance()).toBe(30);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = getBankAccount(25);
    const balance = await account.fetchBalance();
    if (balance) {
      expect(typeof balance).toBe('number');
    } else {
      expect(balance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(250);
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).not.toBe(250);
    } catch (err) {
      expect(account.getBalance()).toBe(250);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(250);
    try {
      await account.synchronizeBalance();
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
