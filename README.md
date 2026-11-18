# Portfolio de Dimitri Gigan

Technicien informatique à Saint-Denis, La Réunion, certifié sur le logiciel ASSIA.

Site statique en HTML, CSS et JavaScript modernes, sans outil de build ni dépendance.

## Modifier le contenu

Tout le texte du site se trouve dans **`data.js`** : identité, certifications, expériences, formations, compétences.
Pour ajouter une expérience, copie un bloc `{ ... }` dans `experiences` et change les textes (le plus récent en haut).

Pour remplacer le CV, dépose le nouveau PDF dans `assets/` sous le nom `CV-Dimitri-Gigan.pdf`.

## Voir le site en local

Ouvre `index.html` dans ton navigateur (double-clic).

## Mettre en ligne (GitHub Pages)

1. Remplace le contenu du dépôt par ces fichiers (garde l'ancienne version dans une branche `v1` si tu veux).
2. Sur GitHub : Settings → Pages → Source « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le site est publié sur https://dimitrigigan.github.io/Portfolio-/

## Structure

```
index.html   structure de la page
style.css    styles (couches @layer, nesting CSS, color-mix, oklch)
main.js      affichage du contenu et effets des cartes
data.js      contenu, le seul fichier à modifier
assets/      CV en PDF et favicon
```
