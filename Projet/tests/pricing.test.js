import { describe, expect, it } from 'vitest';
import { calculateDeliveryFee } from '../src/pricing.js';

describe('B1 - calculateDeliveryFee', () => {
  it.each([
    [2, 1, 2],
    [7, 3, 4],
    [5, 8, 4.5],
    [3, 1, 2],
    [10, 1, 5.5],
    [5, 5, 3],
    [5, 5.01, 4.5],
    [0, 1, 2],
    [0, 0, 2],
    [6, 2, 3.5],
    [10, 6, 7],
    [3.5, 1, 2.25],
    [3.01, 1, 2.01],
  ])('should calculate the expected fee when distance=%s km and weight=%s kg', (distance, weight, expected) => {
    // Arrange
    const delivery = { distance, weight };
    // Act
    const result = calculateDeliveryFee(delivery.distance, delivery.weight);
    // Assert
    expect(result).toBe(expected);
  });

  it.each([10.01, 15])('should refuse delivery when distance is outside the area: %s km', (distance) => {
    // Arrange
    const weight = 1;
    // Act
    const result = calculateDeliveryFee(distance, weight);
    // Assert
    expect(result).toBeNull();
  });

  it.each([[-1, 1], [2, -1]])('should throw when distance=%s or weight=%s is negative', (distance, weight) => {
    // Arrange
    const delivery = { distance, weight };
    // Act
    const action = () => calculateDeliveryFee(delivery.distance, delivery.weight);
    // Assert
    expect(action).toThrow(RangeError);
    expect(action).toThrow('La distance et le poids ne peuvent pas être négatifs.');
  });

  it.each([
    ['2', 1], [null, 1], [Infinity, 1], [NaN, 1],
    [2, '1'], [2, null], [2, Infinity],
  ])('should reject non-numeric input when distance=%s and weight=%s', (distance, weight) => {
    // Arrange
    const delivery = { distance, weight };
    // Act
    const action = () => calculateDeliveryFee(delivery.distance, delivery.weight);
    // Assert
    expect(action).toThrow(TypeError);
  });
});
