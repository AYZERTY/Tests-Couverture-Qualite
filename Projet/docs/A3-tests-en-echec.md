# A3 — Lecture des tests en échec

Chaque modification ci-dessous a été appliquée séparément, testée, puis annulée avant la suivante.
Les nombres correspondent aux exécutions réalisées après A1 et A2.

## 1. Moyenne : multiplication au lieu de division

Résultat : **4 tests en échec**, 44 réussis.

Tests en échec :

- `should calculate the expected average when input is [10,12,14]`
- `should calculate the expected average when input is [10,11,12]`
- `should calculate the expected average when input is [10,11,11]`
- `should calculate the expected average when input is [-2,-4]`

Extrait du message :

```text
AssertionError: expected 108 to be 12 // Object.is equality
```

## 2. Email : suppression de la vérification du @

Résultat : **2 tests en échec**, 46 réussis.

Tests en échec :

- `should return the expected validity when email is "@domain.com"`
- `should return the expected validity when email is "user.domain.com"`

Extrait du message :

```text
AssertionError: expected true to be false // Object.is equality
```

## 3. capitalize : suppression de toLowerCase

Résultat : **1 test en échec**, 47 réussis.

Tests en échec :

- `should capitalize correctly when input is "WORLD"`

Extrait du message :

```text
AssertionError: expected 'WORLD' to be 'World' // Object.is equality
```

## Explication des résultats

- Moyenne : pour `[10, 12, 14]`, le résultat attendu est 12 ; le bug renvoie 108. Le cas `[15]` passe encore, car diviser ou multiplier par 1 donne le même résultat. Les entrées vides ou nulles restent gérées avant le calcul.
- Email : `@domain.com` et `user.domain.com` sont acceptés à tort lorsque le contrôle du `@` est supprimé. Les adresses valides restent acceptées.
- capitalize : `WORLD` produit `WORLD` au lieu de `World`. `hello`, la chaîne vide et `null` passent encore.

## Retour au vert

Après restauration des fonctions : **48 tests réussis, zéro échec**.
