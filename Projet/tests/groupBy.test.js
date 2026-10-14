import { expect, it } from 'vitest';
import { groupBy } from '../src/utils.js';

it('should create one group when all objects share the same role', () => {
  // Arrange
  const alice = { name: 'Alice', role: 'dev' };
  const charlie = { name: 'Charlie', role: 'dev' };
  const people = [alice, charlie];
  // Act
  const result = groupBy(people, 'role');
  // Assert
  expect(result).toEqual({ dev: [alice, charlie] });
});

it('should create several groups when roles differ', () => {
  // Arrange
  const alice = { name: 'Alice', role: 'dev' };
  const bob = { name: 'Bob', role: 'design' };
  const charlie = { name: 'Charlie', role: 'dev' };
  const people = [alice, bob, charlie];
  // Act
  const result = groupBy(people, 'role');
  // Assert
  expect(result).toEqual({ dev: [alice, charlie], design: [bob] });
});

it('should return an empty object when the array is empty', () => {
  // Arrange
  const people = [];
  // Act
  const result = groupBy(people, 'role');
  // Assert
  expect(result).toEqual({});
});

it('should use the undefined group when the key is missing', () => {
  // Arrange
  const alice = { name: 'Alice' };
  const bob = { name: 'Bob' };
  // Act
  const result = groupBy([alice, bob], 'role');
  // Assert
  expect(result).toEqual({ undefined: [alice, bob] });
});

it('should return an empty object when the input is null', () => {
  // Arrange
  const people = null;
  // Act
  const result = groupBy(people, 'role');
  // Assert
  expect(result).toEqual({});
});

it('should preserve the original array when grouping its objects', () => {
  // Arrange
  const people = [{ name: 'Alice', role: 'dev' }, { name: 'Bob', role: 'design' }];
  const original = structuredClone(people);
  // Act
  const result = groupBy(people, 'role');
  // Assert
  expect(people).toEqual(original);
  expect(result.dev).not.toBe(people);
});

it('should create a normal own property when a group is named __proto__', () => {
  // Arrange
  const person = { name: 'Alice', role: '__proto__' };
  // Act
  const result = groupBy([person], 'role');
  // Assert
  expect(Object.hasOwn(result, '__proto__')).toBe(true);
  expect(result.__proto__).toEqual([person]);
  expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
});
