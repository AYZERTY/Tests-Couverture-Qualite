# A4 — Tri des étudiants en TDD

Les huit cas demandés ont été ajoutés dans l’ordre, puis un neuvième vérifie le tri des noms décroissant. La factorisation finale conserve un seul comparateur, copie le tableau et explicite la valeur par défaut `asc`.

| Étape | Test ajouté | Avant modification | Après |
| --- | --- | --- | --- |
| 1 | Tri des notes croissant | Rouge : 1 test(s) en échec | Vert, 49 tests au total |
| 2 | Tri des notes décroissant | Rouge : 1 test(s) en échec | Vert, 50 tests au total |
| 3 | Tri des noms croissant | Rouge : 1 test(s) en échec | Vert, 51 tests au total |
| 4 | Tri des âges croissant | Rouge : 1 test(s) en échec | Vert, 52 tests au total |
| 5 | Entrée null | Rouge : 1 test(s) en échec | Vert, 53 tests au total |
| 6 | Tableau vide | Déjà vert : le code existant couvre ce cas | Vert, 54 tests au total |
| 7 | Conservation du tableau original | Déjà vert : le code existant couvre ce cas | Vert, 55 tests au total |
| 8 | Ordre croissant par défaut | Déjà vert : le code existant couvre ce cas | Vert, 56 tests au total |
| 9 | Tri des noms décroissant | Déjà vert : le code existant couvre ce cas | Vert, 57 tests au total |

Chaque test a été ajouté et lancé avant la modification correspondante. Un test déjà vert ne justifie pas de casser artificiellement le code : il complète les garanties existantes.
