# Portfolio de Dimitri Gigan

Technicien informatique SI santé à Saint-Denis, La Réunion.
Site en ligne : https://dimitrigigan.github.io/Portfolio-/

## Le site

Un portfolio dans l'univers des jeux de cartes :

- **Carte joueur** en haut de page
- **Ma main** : les certificats de formation, à retourner d'un clic (avec le PDF quand il existe)
- **Réalisations** : bascule IZY Protect vers ASSIA PSA, 500+ garanties, 70 % des extractions et requêtes…
- **Parcours** et **Compétences**
- **Mission recruteur** : un petit jeu où l'on joue la carte qui résout une situation

## Modifier le contenu

Tout tient dans **un seul fichier : `index.html`**.
Les textes sont dans la partie `CONTENU`, en bas du fichier (cherche « CONTENU DU PORTFOLIO »).
Garde les guillemets `"..."` et les virgules entre les blocs.

- Un nouveau certificat : copie un bloc dans `certificats`, et dépose le PDF dans `assets/certificats/`.
- Une nouvelle expérience : copie un bloc dans `parcours` (la plus récente en haut).
- `rarete` : `"commune"`, `"rare"`, `"super"`, `"ultra"` ou `"secrete"`. `etoiles` : de 1 à 10.

Le CV se remplace en déposant le nouveau PDF dans `assets/` sous le nom `CV-Dimitri-Gigan.pdf`.

## Fichiers

```
index.html                  le site complet (styles, contenu, code)
assets/CV-Dimitri-Gigan.pdf le CV
assets/certificats/         les certificats en PDF
assets/apercu.png           l'image affichée quand on partage le lien
assets/favicon.svg          l'icône de l'onglet
assets/fonts/               les polices Orbitron et Archivo (licence libre SIL OFL)
```

Les anciennes versions restent dans l'historique Git (et la toute première dans la branche `v1`).
