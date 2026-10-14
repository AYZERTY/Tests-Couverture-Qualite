export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  const text = typeof password === 'string' ? password : '';
  const errors = [];

  if (text.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères.');
  }
  if (!/[A-Z]/.test(text)) {
    errors.push('Le mot de passe doit contenir une majuscule.');
  }
  if (!/[a-z]/.test(text)) {
    errors.push('Le mot de passe doit contenir une minuscule.');
  }
  if (!/\d/.test(text)) {
    errors.push('Le mot de passe doit contenir un chiffre.');
  }
  if (!/[!@#$%^&*]/.test(text)) {
    errors.push('Le mot de passe doit contenir un caractère spécial (!@#$%^&*).');
  }

  return { valid: errors.length === 0, errors };
}

export function isValidAge(age) {
  return Number.isInteger(age) && age >= 0 && age <= 150;
}
