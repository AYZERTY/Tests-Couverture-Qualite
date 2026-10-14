import { describe, expect, it } from 'vitest';
import { parsePrice } from '../src/utils.js';

describe('A5 - parsePrice', () => {
  it.each([
    ['12.99', 12.99], ['12,99', 12.99], ['12.99 €', 12.99],
    ['€12.99', 12.99], [12.99, 12.99], ['gratuit', 0],
    ['abc', null], ['-5.00', null], [null, null],
    ['', null], [0, 0], [-5, null], [Infinity, null],
    ['12abc', null], ['  GRATUIT  ', 0],
  ])('should parse the expected price when input is %j', (input, expected) => {
    // Arrange
    const value = input;
    // Act
    const result = parsePrice(value);
    // Assert
    expect(result).toBe(expected);
  });
});
