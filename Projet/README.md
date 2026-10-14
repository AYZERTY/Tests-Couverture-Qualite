# TP 2 — Tests, couverture et qualité

Ce projet contient la **partie A complète**, exercices supplémentaires compris, et le **début de B1** : le calcul des frais de livraison.

## Avancement

| Exercice | Contenu | État |
| --- | --- | --- |
| A1 | `capitalize`, `calculateAverage`, `slugify`, `clamp` et tests | Terminé |
| A2 | Validation des emails, mots de passe et âges | Terminé |
| A3 | Trois bugs volontaires, lecture des erreurs et corrections | Terminé |
| A4 | `sortStudents` développé en TDD | Terminé |
| A5 | Conversion de prix avec `parsePrice` | Terminé |
| A6 | Regroupement d’objets avec `groupBy`, en TDD | Terminé |
| A7 | Réductions cumulatives avec `calculateDiscount`, en TDD | Terminé |
| B1, fonction 1 | `calculateDeliveryFee` et tests | Terminé |
| Suite de B1 | Codes promo, majoration horaire et total de commande | À faire |
| B2 à B4 | API, tests d’intégration et exercices de qualité | À faire |
| C | Pipeline GitHub Actions | À faire |

## Installation

Node.js 22.13+ ou 24 est nécessaire. Les versions de dépendances sont fixées dans `package-lock.json`.

```bash
npm ci
npm test
```

| Commande | Utilisation |
| --- | --- |
| `npm test` | Lancer tous les tests une fois |
| `npm run test:watch` | Relancer les tests à chaque modification |
| `npm run test:coverage` | Afficher la couverture et générer le rapport HTML |
| `npm run lint` | Vérifier le code avec ESLint |
| `npm run check` | Lancer le linter, puis les tests avec couverture |

Vitest est utilisé pour les tests unitaires. ESLint et la commande de couverture sont installés dès la mise en place, comme demandé dans l’énoncé. Le seuil de couverture de B3 n’est pas encore configuré. Express et Supertest sont installés pour la future partie API.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `src/utils.js` | Fonctions des exercices A1, A4, A5, A6 et A7 |
| `src/validators.js` | Validateurs de l’exercice A2 |
| `src/pricing.js` | Première fonction de B1 |
| `tests/utils.test.js` | Tests d’A1 et A4 |
| `tests/validators.test.js` | Tests d’A2 |
| `tests/price.test.js` | Tests d’A5 |
| `tests/groupBy.test.js` | Tests d’A6 |
| `tests/discount.test.js` | Tests d’A7 |
| `tests/pricing.test.js` | Tests du calcul de livraison |
| `docs/` | Observations d’A3 et journaux TDD |

Les tests suivent la structure **Arrange → Act → Assert** et sont nommés avec `should … when …`. Les données sont définies dans les tests : aucun test ne dépend de l’heure, du réseau ou d’une base de données.

## A3 — Comprendre les échecs

Les trois modifications volontaires ont été exécutées séparément :

| Bug introduit | Tests en échec | Exemple |
| --- | --- | --- |
| Multiplication au lieu de division dans la moyenne | 4 | `[10, 12, 14]` donne 108 au lieu de 12 |
| Suppression de la vérification du `@` | 2 | `user.domain.com` est accepté à tort |
| Suppression de `toLowerCase()` | 1 | `WORLD` reste `WORLD` au lieu de devenir `World` |

Les fonctions ont ensuite été corrigées. Le détail des erreurs est dans [le compte rendu A3](docs/A3-tests-en-echec.md).

## TDD

Pour A4, A6 et A7, les tests ont été ajoutés et exécutés avant la modification du code. Les journaux indiquent les échecs observés et le retour au vert. Un nouveau test déjà satisfait par l’implémentation reste signalé comme « déjà vert ».

- [A4 — Tri des étudiants](docs/A4-journal-TDD.md)
- [A6 — Regroupement par clé](docs/A6-journal-TDD.md)
- [A7 — Réductions cumulatives](docs/A7-journal-TDD.md)

## Choix de fonctionnement

- `slugify` enlève également les accents : `C’est l’été !` devient `cest-lete`.
- `sortStudents` retourne un nouveau tableau, avec un tri croissant par défaut. Il accepte les clés `name`, `grade` et `age` prévues par l’exercice.
- `parsePrice` retourne `null` pour un prix invalide ou négatif, et 0 pour `gratuit`.
- `groupBy` place les objets sans la clé demandée dans le groupe `undefined`. Une entrée nulle ou vide retourne `{}`.
- `calculateDiscount` applique les règles dans l’ordre. Le total reste au minimum à zéro et le résultat final est arrondi au centime. Une entrée invalide déclenche une exception.
- Pour `buyXgetY`, la signature ne reçoit pas de quantité : les lots sont donc déduits du **montant courant** et du prix unitaire. Avec `buy: 3`, `free: 1`, `itemPrice: 10`, un panier de 40 € forme un lot de quatre articles et revient à 30 €. Un panier de 30 € ne forme pas de lot complet. Cette interprétation est explicite pour pouvoir l’adapter si une quantité est ajoutée ensuite.

## Début de B1 — Frais de livraison

La base est de **2 €**. Au-delà de 3 km et jusqu’à 10 km inclus, chaque kilomètre supplémentaire coûte 0,50 €. Un poids strictement supérieur à 5 kg ajoute 1,50 €.

| Distance | Poids | Résultat |
| --- | --- | --- |
| 2 km | 1 kg | 2 € |
| 7 km | 3 kg | 4 € |
| 5 km | 8 kg | 4,50 € |
| 10 km | 6 kg | 7 € |
| 15 km | 1 kg | `null`, hors zone |

Une distance ou un poids négatif déclenche une erreur. Zéro est accepté. Les distances décimales sont prises en compte et le résultat est arrondi au centime.
