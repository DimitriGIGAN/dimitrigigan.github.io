# Portfolio de Dimitri Gigan

Technicien informatique à Saint-Denis, La Réunion, certifié sur le logiciel ASSIA.

Site statique en HTML, CSS et JavaScript modernes, sans outil de build ni dépendance.

## Le mode jeu

Le portfolio se joue comme un jeu de cartes :

- **Certifications** : les 6 modules ASSIA en éventail, à retourner pour lire le détail.
- **Parcours** : une pioche, chaque carte posée sur le terrain révèle une étape.
- **Compétences** : des boosters de 5 cartes à ouvrir, de la rare à la rare secrète.
- **Missions** : un mini-duel où le recruteur joue la carte qui résout une situation.
- **Collection** : un album qui se remplit, avec une carte secrète au bout.

La progression est enregistrée dans le navigateur du visiteur. Les sons sont générés par le navigateur (aucun fichier) et coupés par défaut.
Le site s'ouvre en **mode classique** (parcours en liste). Le bouton « Mode jeu » lance le jeu de cartes, et le choix du visiteur est retenu.

## Modifier le contenu

Tout le texte du site se trouve dans **`data.js`** : identité, certifications, expériences, formations, compétences.
Pour ajouter une expérience, copie un bloc `{ ... }` dans `experiences` et change les textes (le plus récent en haut, avec l'année `debut` pour l'ordre de la pioche).

Les cartes compétences (`cartesCompetences`), les missions (`missions`) et la carte secrète (`carteSecrete`) se modifient aussi dans `data.js`. Niveaux (étoiles) et raretés : mets les tiens.

Pour remplacer le CV, dépose le nouveau PDF dans `assets/` sous le nom `CV-Dimitri-Gigan.pdf`.

## Voir le site en local

Ouvre `index.html` dans ton navigateur (double-clic).

## Mettre en ligne (GitHub Pages)

1. Remplace le contenu du dépôt par ces fichiers (garde l'ancienne version dans une branche `v1` si tu veux).
2. Sur GitHub : Settings → Pages → Source « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le site est publié sur https://dimitrigigan.github.io/Portfolio-/

Après une grosse modification de `style.css`, `main.js` ou `data.js`, augmente le numéro `?v=` dans `index.html` (par exemple `?v=4`) pour que les visiteurs reçoivent la nouvelle version.

## Structure

```
index.html   structure de la page
style.css    styles (couches @layer, nesting CSS, color-mix, oklch)
main.js      moteur du jeu : cartes, pioche, boosters, missions, collection, sons
data.js      contenu, le seul fichier à modifier
assets/      CV en PDF et favicon
```
