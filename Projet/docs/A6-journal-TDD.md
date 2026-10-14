# A6 — groupBy en TDD

Les groupes sont construits avec une Map, puis convertis en objet. Une clé absente produit un groupe nommé `undefined` ; une entrée vide ou nulle produit `{}`.

| Étape | Test ajouté | Avant modification | Après |
| --- | --- | --- | --- |
| 1 | Un seul groupe | Rouge : 1 test(s) en échec | Vert, 73 tests au total |
| 2 | Plusieurs groupes | Rouge : 1 test(s) en échec | Vert, 74 tests au total |
| 3 | Tableau vide | Déjà vert : le code existant couvre ce cas | Vert, 75 tests au total |
| 4 | Clé inexistante | Déjà vert : le code existant couvre ce cas | Vert, 76 tests au total |
| 5 | Entrée null | Rouge : 1 test(s) en échec | Vert, 77 tests au total |
| 6 | Conservation des données | Déjà vert : le code existant couvre ce cas | Vert, 78 tests au total |
| 7 | Nom de groupe spécial | Déjà vert : le code existant couvre ce cas | Vert, 79 tests au total |

Chaque test a été ajouté et lancé avant la modification correspondante. Un test déjà vert ne justifie pas de casser artificiellement le code : il complète les garanties existantes.
