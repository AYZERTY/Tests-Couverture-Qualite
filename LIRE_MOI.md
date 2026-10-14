# TP 2 — Partie A et début de B

Cette archive contient A1 à A7 et seulement la première fonction de B1 : calculateDeliveryFee.

## Lire et lancer le projet

Le dossier `projet` contient les fichiers. Ouvrir un terminal dans ce dossier et lancer :

```bash
npm ci
npm test
npm run lint
```

Node.js 22.13+ ou 24 est nécessaire. Le README détaille les exercices et les choix de fonctionnement. Les observations A3 et les journaux TDD sont dans `docs/`.

## Récupérer aussi les 10 commits et publier

Pour conserver les commits, ouvrir un terminal dans le dossier extrait contenant `TP2_historique.bundle`, puis lancer :

```bash
git clone TP2_historique.bundle TP2-Git
cd TP2-Git
git remote set-url origin https://github.com/AYZERTY/Tests-Couverture-Qualite.git
git push -u origin main
```

Git demandera une connexion au compte GitHub si nécessaire. La version conservant l'historique est alors dans `TP2-Git`.

## État du travail

- 136 tests réussis et zéro erreur de linter.
- A1 à A7 terminés, avec trois bugs étudiés puis corrigés pour A3.
- TDD réalisé pour sortStudents, groupBy et calculateDiscount.
- B1 commencé avec calculateDeliveryFee ; ses trois autres fonctions restent à faire.
- B2, les exercices B3/B4 et C restent à faire. Les outils de test, couverture et linting sont déjà installés au titre de la mise en place.
- Le dépôt distant n'a pas été modifié depuis cette conversation : l'accès en écriture n'est pas connecté.
