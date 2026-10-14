# A7 — Réductions cumulatives en TDD

Les cas métier ont été ajoutés progressivement. Les validations ont ensuite été regroupées par type de règle. Le total est borné à zéro après chaque règle et arrondi au centime à la fin. Pour `buyXgetY`, un lot complet vaut `(buy + free) × itemPrice` avant réduction. Le nombre de lots est déduit du montant courant, car la signature ne reçoit pas de quantité.

| Étape | Test ajouté | Avant modification | Après |
| --- | --- | --- | --- |
| 1 | Réduction de 10 % | Rouge : 1 test(s) en échec | Vert, 80 tests au total |
| 2 | Réduction fixe | Rouge : 1 test(s) en échec | Vert, 81 tests au total |
| 3 | Cumul dans l’ordre | Rouge : 1 test(s) en échec | Vert, 82 tests au total |
| 4 | Ordre inverse | Déjà vert : le code existant couvre ce cas | Vert, 83 tests au total |
| 5 | Plancher à zéro | Rouge : 1 test(s) en échec | Vert, 84 tests au total |
| 6 | Trois achetés, un offert | Rouge : 1 test(s) en échec | Vert, 85 tests au total |
| 7 | Plusieurs lots | Déjà vert : le code existant couvre ce cas | Vert, 86 tests au total |
| 8 | Lot incomplet | Déjà vert : le code existant couvre ce cas | Vert, 87 tests au total |
| 9 | Sans règle | Déjà vert : le code existant couvre ce cas | Vert, 88 tests au total |
| 10 | Prix invalide | Rouge : 5 test(s) en échec | Vert, 93 tests au total |
| 11 | Arrondi au centime | Rouge : 1 test(s) en échec | Vert, 94 tests au total |
| 12 | Liste et types de règles invalides | Déjà vert : le code existant couvre ce cas | Vert, 98 tests au total |
| 13 | Valeurs de réduction invalides | Déjà vert : le code existant couvre ce cas | Vert, 109 tests au total |
| 14 | Réduction totale | Déjà vert : le code existant couvre ce cas | Vert, 110 tests au total |
| 15 | Prix nul | Déjà vert : le code existant couvre ce cas | Vert, 111 tests au total |
| 16 | Données inchangées | Déjà vert : le code existant couvre ce cas | Vert, 112 tests au total |

Chaque test a été ajouté et lancé avant la modification correspondante. Un test déjà vert ne justifie pas de casser artificiellement le code : il complète les garanties existantes.
