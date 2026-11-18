# Portfolio de Dimitri Gigan

Technicien informatique SI santé à Saint-Denis, La Réunion.
Site en ligne : https://dimitrigigan.github.io/

## Le site

Un portfolio dans l'univers des jeux de cartes, en français (`/`) et en anglais (`/en/`). Il s'ouvre en **mode classique** (parcours et compétences en liste) ; le bouton **Mode jeu** active les jeux, et le choix du visiteur est retenu.

- **Carte joueur** en haut de page, avec effet holographique (la carte s'incline sous la souris, brille au toucher)
- **Ma main** : les certificats de formation, à retourner d'un clic (avec le PDF)
- **Réalisations** et **étude de cas** de la bascule IZY Protect vers ASSIA PSA (500+ garanties, plus de 100 requêtes et extractions)
- **Pioche du parcours** : les étapes se posent une par une sur le terrain
- **Booster de compétences** : 5 cartes à retourner, de la commune à l'ultra rare
- **Duels** : un problème a des points de vie, il faut jouer la carte qui le bat (3 cœurs, rang final)
- **Collection** : un album de 23 cartes et une carte secrète, **8 trophées**, bouton **Partager mon score**
- **Sons** : bruitages de cartes, coupés par défaut (bouton haut-parleur)
- Sur téléphone : menu, flèches sur les rangées de cartes qui défilent

## Modifier le contenu

Tout tient dans **un seul fichier : `index.html`**.
Les textes sont dans la partie `CONTENU`, en bas du fichier (cherche « CONTENU DU PORTFOLIO »).
Garde les guillemets `"..."` et les virgules entre les blocs.

- Un nouveau certificat : copie un bloc dans `certificats`, et dépose le PDF dans `assets/certificats/`.
- Une nouvelle expérience : copie un bloc dans `parcours` (du plus ancien au plus récent, c'est l'ordre de la pioche) avec un `id` unique.
- `rarete` : `"commune"`, `"rare"`, `"super"`, `"ultra"` ou `"secrete"`. `etoiles` : de 1 à 10.

Le CV se remplace en déposant le nouveau PDF dans `assets/` sous le nom `CV-Dimitri-Gigan.pdf`.

## Fichiers

```
index.html                  le site complet (styles, contenu, code)
assets/CV-Dimitri-Gigan.pdf le CV
assets/certificats/         les certificats en PDF
assets/apercu.jpg           l'image affichée quand on partage le lien
assets/favicon.svg          l'icône de l'onglet
assets/fonts/               les polices Orbitron et Archivo (licence libre SIL OFL)
```

Les anciennes versions restent dans l'historique Git (et la toute première dans la branche `v1`).

## Version anglaise

La page anglaise `en/index.html` est **générée** à partir de `index.html` : ne la modifie pas à la main.
1. Modifie `index.html` (et le contenu anglais dans `outils/contenu-en.js` si un texte change).
2. Lance `python3 outils/build_en.py` depuis la racine du site.
Si un texte français de l'interface a changé, le script le signale : mets à jour la liste `PAIRES` dans `outils/build_en.py`.

## Référencement

`robots.txt`, `sitemap.xml`, balises `hreflang` et données structurées (`Person`) sont en place.
Pour suivre l'indexation, ajoute le site dans Google Search Console et envoie `https://dimitrigigan.github.io/sitemap.xml`.

