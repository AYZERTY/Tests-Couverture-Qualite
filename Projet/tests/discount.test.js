import { expect, it } from 'vitest';
import { calculateDiscount } from '../src/utils.js';

it('should apply a percentage when a percentage rule is given', () => {
  // Arrange
  const price = 100;
  const rules = [{ type: 'percentage', value: 10 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(90);
});

it('should subtract five euros when a fixed rule is given', () => {
  // Arrange
  const price = 30;
  const rules = [{ type: 'fixed', value: 5 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(25);
});

it('should apply rules in order when percentage comes before fixed', () => {
  // Arrange
  const price = 100;
  const rules = [{ type: 'percentage', value: 10 }, { type: 'fixed', value: 5 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(85);
});

it('should change the result when fixed comes before percentage', () => {
  // Arrange
  const price = 100;
  const rules = [{ type: 'fixed', value: 5 }, { type: 'percentage', value: 10 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(85.5);
});

it('should return zero when the reduction exceeds the price', () => {
  // Arrange
  const price = 3;
  const rules = [{ type: 'fixed', value: 5 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(0);
});

it('should give one item free when the basket contains four items', () => {
  // Arrange
  const price = 40;
  const rules = [{ type: 'buyXgetY', buy: 3, free: 1, itemPrice: 10 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(30);
});

it('should give two items free when the basket contains eight items', () => {
  // Arrange
  const price = 80;
  const rules = [{ type: 'buyXgetY', buy: 3, free: 1, itemPrice: 10 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(60);
});

it('should keep the price when the basket does not contain a full lot', () => {
  // Arrange
  const price = 30;
  const rules = [{ type: 'buyXgetY', buy: 3, free: 1, itemPrice: 10 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(30);
});

it('should keep the price when the list of rules is empty', () => {
  // Arrange
  const price = 50;
  const rules = [];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(50);
});

it.each([-1, '10', null, NaN, Infinity])('should throw when the price is invalid: %s', (input) => {
  // Arrange
  const rules = [{ type: 'percentage', value: 10 }];
  // Act
  const action = () => calculateDiscount(input, rules);
  // Assert
  expect(action).toThrow(TypeError);
});

it('should round the result when a percentage produces fractions of cents', () => {
  // Arrange
  const price = 19.99;
  const rules = [{ type: 'percentage', value: 10 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(17.99);
});

it.each([null, {}, [null], [{ type: 'unknown', value: 10 }]])(
  'should throw when discount rules are invalid: %j', (rules) => {
    // Arrange
    const price = 50;
    // Act
    const action = () => calculateDiscount(price, rules);
    // Assert
    expect(action).toThrow(TypeError);
  },
);

it.each([
  { type: 'fixed', value: -5 },
  { type: 'fixed', value: '5' },
  { type: 'fixed', value: Infinity },
  { type: 'percentage', value: 101 },
  { type: 'buyXgetY', buy: 0, free: 1, itemPrice: 10 },
  { type: 'buyXgetY', buy: 2.5, free: 1, itemPrice: 10 },
  { type: 'buyXgetY', buy: 3, free: 0, itemPrice: 10 },
  { type: 'buyXgetY', buy: 3, free: 1.5, itemPrice: 10 },
  { type: 'buyXgetY', buy: 3, free: 1, itemPrice: '10' },
  { type: 'buyXgetY', buy: 3, free: 1, itemPrice: Infinity },
  { type: 'buyXgetY', buy: 3, free: 1, itemPrice: 0 },
])('should throw when a reduction value is invalid: %j', (rule) => {
  // Arrange
  const price = 50;
  // Act
  const action = () => calculateDiscount(price, [rule]);
  // Assert
  expect(action).toThrow();
});

it('should return zero when the percentage is one hundred', () => {
  // Arrange
  const price = 50;
  const rules = [{ type: 'percentage', value: 100 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(0);
});

it('should keep zero when the price is zero', () => {
  // Arrange
  const price = 0;
  const rules = [{ type: 'percentage', value: 10 }];
  // Act
  const result = calculateDiscount(price, rules);
  // Assert
  expect(result).toBe(0);
});

it('should preserve the rules when a discount is calculated', () => {
  // Arrange
  const rules = [{ type: 'percentage', value: 10 }, { type: 'fixed', value: 5 }];
  const original = structuredClone(rules);
  // Act
  const result = calculateDiscount(100, rules);
  // Assert
  expect(result).toBe(85);
  expect(rules).toEqual(original);
});
