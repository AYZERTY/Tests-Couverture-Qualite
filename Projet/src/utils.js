export function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }
  if (!numbers.every((number) => typeof number === 'number' && Number.isFinite(number))) {
    throw new TypeError('Le tableau doit contenir uniquement des nombres finis.');
  }
  const total = numbers.reduce((sum, number) => sum + number, 0);
  const average = total / numbers.length;
  return Math.round((average + Number.EPSILON) * 100) / 100;
}

export function slugify(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function sortStudents(students, sortBy, order = 'asc') {
  if (!Array.isArray(students)) {
    return [];
  }
  const direction = order === 'desc' ? -1 : 1;
  return [...students].sort((a, b) => {
    const comparison = sortBy === 'name' ? a.name.localeCompare(b.name, 'fr') : a[sortBy] - b[sortBy];
    return direction * comparison;
  });
}

export function parsePrice(input) {
  if (typeof input === 'number') {
    return Number.isFinite(input) && input >= 0 ? input : null;
  }
  if (typeof input !== 'string') {
    return null;
  }
  const text = input.trim().toLowerCase();
  if (text === 'gratuit') {
    return 0;
  }
  if (!/^(?:€\s*)?\d+(?:[.,]\d+)?(?:\s*€)?$/.test(text)) {
    return null;
  }
  const price = Number(text.replace(/€/g, '').trim().replace(',', '.'));
  return Number.isFinite(price) ? price : null;
}

export function groupBy(array, key) {
  if (!Array.isArray(array)) {
    return {};
  }
  const groups = new Map();
  for (const item of array) {
    const value = String(item[key]);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return Object.fromEntries(groups);
}

export function calculateDiscount(price, discountRules) {
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    throw new TypeError('Le prix doit être un nombre positif ou nul.');
  }
  if (!Array.isArray(discountRules)) {
    throw new TypeError('Les règles de réduction doivent être un tableau.');
  }

  let total = price;
  for (const rule of discountRules) {
    if (!rule || !['percentage', 'fixed', 'buyXgetY'].includes(rule.type)) {
      throw new TypeError('Type de réduction invalide.');
    }
    if (rule.type === 'percentage' || rule.type === 'fixed') {
      if (typeof rule.value !== 'number' || !Number.isFinite(rule.value) || rule.value < 0) {
        throw new TypeError('La valeur de réduction doit être un nombre positif ou nul.');
      }
      if (rule.type === 'percentage' && rule.value > 100) {
        throw new RangeError('Le pourcentage doit être compris entre 0 et 100.');
      }
      total = rule.type === 'percentage' ? total * (1 - rule.value / 100) : total - rule.value;
    } else {
      if (!Number.isInteger(rule.buy) || rule.buy < 1 ||
          !Number.isInteger(rule.free) || rule.free < 1 ||
          typeof rule.itemPrice !== 'number' || !Number.isFinite(rule.itemPrice) || rule.itemPrice <= 0) {
        throw new TypeError('Le lot doit avoir des quantités entières positives et un prix unitaire positif.');
      }
      // Un lot comprend buy articles payants et free articles offerts.
      const groupPrice = (rule.buy + rule.free) * rule.itemPrice;
      const groups = Math.floor(total / groupPrice);
      total -= groups * rule.free * rule.itemPrice;
    }
    total = Math.max(0, total);
  }
  return Math.round((total + Number.EPSILON) * 100) / 100;
}
