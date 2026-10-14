import { describe, expect, it } from 'vitest';
import { isValidAge, isValidEmail, isValidPassword } from '../src/validators.js';

describe('A2 - isValidEmail', () => {
  it.each([
    ['user@example.com', true],
    ['user.name+tag@domain.co', true],
    ['invalid', false],
    ['@domain.com', false],
    ['user@', false],
    ['', false],
    [null, false],
    ['user.domain.com', false],
  ])('should return the expected validity when email is %j', (input, expected) => {
    // Arrange
    const email = input;
    // Act
    const result = isValidEmail(email);
    // Assert
    expect(result).toBe(expected);
  });
});

describe('A2 - isValidPassword', () => {
  const lengthError = 'Le mot de passe doit contenir au moins 8 caractères.';
  const uppercaseError = 'Le mot de passe doit contenir une majuscule.';
  const lowercaseError = 'Le mot de passe doit contenir une minuscule.';
  const digitError = 'Le mot de passe doit contenir un chiffre.';
  const specialError = 'Le mot de passe doit contenir un caractère spécial (!@#$%^&*).';

  it.each([
    ['Passw0rd!', []],
    ['Abcdef1!', []],
    ['short', [lengthError, uppercaseError, digitError, specialError]],
    ['alllowercase1!', [uppercaseError]],
    ['ALLUPPERCASE1!', [lowercaseError]],
    ['NoDigits!here', [digitError]],
    ['NoSpecial1here', [specialError]],
    ['', [lengthError, uppercaseError, lowercaseError, digitError, specialError]],
    [null, [lengthError, uppercaseError, lowercaseError, digitError, specialError]],
  ])('should return all expected error messages when password is %j', (input, errors) => {
    // Arrange
    const password = input;
    // Act
    const result = isValidPassword(password);
    // Assert
    expect(result).toEqual({ valid: errors.length === 0, errors });
  });
});

describe('A2 - isValidAge', () => {
  it.each([
    [25, true], [0, true], [150, true], [-1, false],
    [151, false], [25.5, false], ['25', false], [null, false],
  ])('should return the expected validity when age is %j', (input, expected) => {
    // Arrange
    const age = input;
    // Act
    const result = isValidAge(age);
    // Assert
    expect(result).toBe(expected);
  });
});
