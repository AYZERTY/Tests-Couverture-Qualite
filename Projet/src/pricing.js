// B1 — première fonction : frais de livraison selon la distance et le poids.
export function calculateDeliveryFee(distance, weight) {
  if (typeof distance !== 'number' || !Number.isFinite(distance) ||
      typeof weight !== 'number' || !Number.isFinite(weight)) {
    throw new TypeError('La distance et le poids doivent être des nombres finis.');
  }
  if (distance < 0 || weight < 0) {
    throw new RangeError('La distance et le poids ne peuvent pas être négatifs.');
  }
  if (distance > 10) {
    return null;
  }

  const distanceFee = distance > 3 ? (distance - 3) * 0.5 : 0;
  const weightFee = weight > 5 ? 1.5 : 0;
  const total = 2 + distanceFee + weightFee;

  return Math.round((total + Number.EPSILON) * 100) / 100;
}
