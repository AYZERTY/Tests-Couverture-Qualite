import { describe, expect, it } from 'vitest';
import { calculateAverage, capitalize, clamp, slugify, sortStudents } from '../src/utils.js';

describe('A1 - capitalize', () => {
  it.each([
    ['hello', 'Hello', 'the text is lowercase'],
    ['WORLD', 'World', 'the text is uppercase'],
    ['', '', 'the string is empty'],
    [null, '', 'the input is null'],
  ])('should capitalize correctly when input is %j', (input, expected) => {
    // Arrange
    const text = input;
    // Act
    const result = capitalize(text);
    // Assert
    expect(result).toBe(expected);
  });
});

describe('A1 - calculateAverage', () => {
  it.each([
    [[10, 12, 14], 12, 'several grades are given'],
    [[15], 15, 'one grade is given'],
    [[], 0, 'the array is empty'],
    [[10, 11, 12], 11, 'the average is an integer'],
    [null, 0, 'the input is null'],
    [[10, 11, 11], 10.67, 'rounding to two decimals is needed'],
    [[-2, -4], -3, 'the numbers are negative'],
  ])('should calculate the expected average when input is %j', (input, expected) => {
    // Arrange
    const numbers = input;
    // Act
    const result = calculateAverage(numbers);
    // Assert
    expect(result).toBe(expected);
  });

  it('should throw when an array contains a non-number', () => {
    // Arrange
    const numbers = [10, '12'];
    // Act
    const action = () => calculateAverage(numbers);
    // Assert
    expect(action).toThrow(TypeError);
  });
});

describe('A1 - slugify', () => {
  it.each([
    ['Hello World', 'hello-world'],
    [' Spaces Everywhere ', 'spaces-everywhere'],
    ["C'est l'ete !", 'cest-lete'],
    ['', ''],
    ["C'est l'été !", 'cest-lete'],
    ['hello   world', 'hello-world'],
    [null, ''],
  ])('should produce a URL slug when input is %j', (input, expected) => {
    // Arrange
    const text = input;
    // Act
    const result = slugify(text);
    // Assert
    expect(result).toBe(expected);
  });
});

describe('A1 - clamp', () => {
  it.each([
    [5, 0, 10, 5],
    [-5, 0, 10, 0],
    [15, 0, 10, 10],
    [0, 0, 0, 0],
  ])('should keep the value within bounds when value=%s, min=%s, max=%s', (value, min, max, expected) => {
    // Arrange
    const bounds = { min, max };
    // Act
    const result = clamp(value, bounds.min, bounds.max);
    // Assert
    expect(result).toBe(expected);
  });
});

it('should sort students by grade ascending when order is asc', () => {
  // Arrange
  const students = [
    { name: 'Charlie', grade: 12, age: 23 },
    { name: 'Alice', grade: 18, age: 21 },
    { name: 'Bob', grade: 15, age: 19 },
  ];
  // Act
  const result = sortStudents(students, 'grade', 'asc');
  // Assert
  expect(result.map((student) => student.grade)).toEqual([12, 15, 18]);
});

it('should sort students by grade descending when order is desc', () => {
  // Arrange
  const students = [
    { name: 'Charlie', grade: 12, age: 23 },
    { name: 'Alice', grade: 18, age: 21 },
    { name: 'Bob', grade: 15, age: 19 },
  ];
  // Act
  const result = sortStudents(students, 'grade', 'desc');
  // Assert
  expect(result.map((student) => student.grade)).toEqual([18, 15, 12]);
});

it('should sort students by name ascending when sortBy is name', () => {
  // Arrange
  const students = [
    { name: 'Charlie', grade: 12, age: 23 },
    { name: 'Alice', grade: 18, age: 21 },
    { name: 'Bob', grade: 15, age: 19 },
  ];
  // Act
  const result = sortStudents(students, 'name', 'asc');
  // Assert
  expect(result.map((student) => student.name)).toEqual(['Alice', 'Bob', 'Charlie']);
});

it('should sort students by age ascending when sortBy is age', () => {
  // Arrange
  const students = [
    { name: 'Charlie', grade: 12, age: 23 },
    { name: 'Alice', grade: 18, age: 21 },
    { name: 'Bob', grade: 15, age: 19 },
  ];
  // Act
  const result = sortStudents(students, 'age', 'asc');
  // Assert
  expect(result.map((student) => student.age)).toEqual([19, 21, 23]);
});

it('should return an empty array when students is null', () => {
  // Arrange
  const students = null;
  // Act
  const result = sortStudents(students, 'grade');
  // Assert
  expect(result).toEqual([]);
});

it('should return an empty array when students is empty', () => {
  // Arrange
  const students = [];
  // Act
  const result = sortStudents(students, 'grade');
  // Assert
  expect(result).toEqual([]);
  expect(result).not.toBe(students);
});

it('should preserve the original array when students are sorted', () => {
  // Arrange
  const students = [
    { name: 'Charlie', grade: 12, age: 23 },
    { name: 'Alice', grade: 18, age: 21 },
    { name: 'Bob', grade: 15, age: 19 },
  ];
  const original = structuredClone(students);
  // Act
  const result = sortStudents(students, 'name');
  // Assert
  expect(students).toEqual(original);
  expect(result).not.toBe(students);
});

it('should default to ascending order when order is omitted', () => {
  // Arrange
  const students = [
    { name: 'Charlie', grade: 12, age: 23 },
    { name: 'Alice', grade: 18, age: 21 },
    { name: 'Bob', grade: 15, age: 19 },
  ];
  // Act
  const result = sortStudents(students, 'grade');
  // Assert
  expect(result.map((student) => student.grade)).toEqual([12, 15, 18]);
});

it('should sort names descending when order is desc', () => {
  // Arrange
  const students = [
    { name: 'Charlie', grade: 12, age: 23 },
    { name: 'Alice', grade: 18, age: 21 },
    { name: 'Bob', grade: 15, age: 19 },
  ];
  // Act
  const result = sortStudents(students, 'name', 'desc');
  // Assert
  expect(result.map((student) => student.name)).toEqual(['Charlie', 'Bob', 'Alice']);
});
