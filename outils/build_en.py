#!/usr/bin/env python3
"""Génère la version anglaise (en/index.html) à partir de index.html.

Usage : python3 outils/build_en.py   (depuis la racine du site)
- Le contenu anglais est dans outils/contenu-en.js
- Les textes de l'interface sont traduits par la liste PAIRES ci-dessous.
  Si un texte français n'est plus trouvé, le script s'arrête : il faut mettre la paire à jour.
"""
import pathlib, re, sys

RACINE = pathlib.Path(__file__).resolve().parent.parent
fr = (RACINE / "index.html").read_text(encoding="utf-8")
contenu_en = (RACINE / "outils" / "contenu-en.js").read_text(encoding="utf-8").strip()

# 1. Contenu : on remplace tout l'objet CONTENU par sa version anglaise
debut = fr.index("const CONTENU = {")
fin = fr.index("\n};\n", debut) + 3
bloc_fr = fr[debut:fin]
courriel = re.search(r'email: "([^"]+)"', bloc_fr).group(1)
html = fr[:debut] + contenu_en.replace("__EMAIL__", courriel) + fr[fin:]

# 2. Données structurées pour Google
ld = re.search(r'<script type="application/ld\+json">.*?</script>', html, re.S).group(0)
ld_en = (ld
  .replace('"url": "https://dimitrigigan.github.io/"', '"url": "https://dimitrigigan.github.io/en/"')
  .replace("Technicien informatique SI santé", "Health insurance IT technician")
  .replace("Technicien informatique spécialisé dans les logiciels de mutuelle : ASSIA, migration de données, paramétrage, SQL et support applicatif.",
           "IT technician specialised in health mutual software: ASSIA, data migration, configuration, SQL and application support.")
  .replace('"La Réunion"', '"Réunion Island"')
  .replace('"Paramétrage produit", "Migration de données"', '"Product configuration", "Data migration"')
  .replace('"Support applicatif", "Systèmes d\'information de mutuelle"', '"Application support", "Health mutual information systems"')
  .replace('"Formation ASSIA 360°"', '"ASSIA 360° training"')
  .replace('"Paramétrage produit (ASSIA)"', '"Product configuration (ASSIA)"')
  .replace('"Certificat de formation"', '"Training certificate"'))
html = html.replace(ld, ld_en)

PAIRES = [
  # En-tête du document
  ('<html lang="fr">', '<html lang="en">'),
  ("Dimitri Gigan, technicien informatique SI santé", "Dimitri Gigan, health insurance IT technician"),
  ("Dimitri Gigan, technicien informatique à Saint-Denis (La Réunion). Logiciels de mutuelle, ASSIA, migration de données, SQL et support applicatif.",
   "Dimitri Gigan, IT technician in Saint-Denis (Réunion Island). Health mutual software, ASSIA, data migration, SQL and application support."),
  ("Bascule IZY Protect vers ASSIA PSA, plus de 500 garanties paramétrées, plus de 100 requêtes et extractions réalisées pour une mutuelle.",
   "Migration from IZY Protect to ASSIA PSA, more than 500 coverage benefits configured, more than 100 queries and extractions for a health mutual."),
  ('<meta property="og:url" content="https://dimitrigigan.github.io/">', '<meta property="og:url" content="https://dimitrigigan.github.io/en/">'),
  ('<link rel="canonical" href="https://dimitrigigan.github.io/">', '<link rel="canonical" href="https://dimitrigigan.github.io/en/">'),
  ('<meta property="og:locale" content="fr_FR">\n<meta property="og:locale:alternate" content="en_US">',
   '<meta property="og:locale" content="en_US">\n<meta property="og:locale:alternate" content="fr_FR">'),
  # Barre du haut
  (">Aller au contenu<", ">Skip to content<"),
  ('aria-label="Retour en haut"', 'aria-label="Back to top"'),
  ('href="#main-cartes">Certificats</a>', 'href="#main-cartes">Certificates</a>'),
  ('>Voir tout le parcours</button>', '>Show the whole career</button>'),
  ('ouvert ? "Réduire le parcours" : "Voir tout le parcours"', 'ouvert ? "Show less" : "Show the whole career"'),
  ('aria-label="Revenir en haut de la page"', 'aria-label="Back to top"'),
  ('"enjeux de la bascule"', '"migration challenges"'),
  ('IZY Protect<small>ancien logiciel</small>', 'IZY Protect<small>old software</small>'),
  ('ASSIA PSA<small>nouveau logiciel</small>', 'ASSIA PSA<small>new software</small>'),
  ('<li>Reprise</li><li>Contrôle</li><li>Bascule</li><li>Fiabilisation</li>', '<li>Takeover</li><li>Checks</li><li>Switchover</li><li>Cleanup</li>'),
  (' % des données basculées</p>', ' % of data migrated</p>'),
  ("Animation : les données mutualistes passent de l'ancien logiciel au nouveau, en quatre étapes : reprise, contrôle, bascule et fiabilisation.", "Animation: member data moves from the old software to the new one in four steps: takeover, checks, switchover and cleanup."),
  ('fillText("contrôle", gx', 'fillText("checks", gx'),
  ('<a href="articles/">Articles</a>', '<a href="../articles/" hreflang="fr">Articles (FR)</a>'),
  ('<span class="vh"> (nouvel onglet)</span>', '<span class="vh"> (opens in a new tab)</span>'),
  ('aria-label="Voir le certificat ${esc(c.nom)} (PDF, nouvel onglet)"', 'aria-label="View the ${esc(c.nom)} certificate (PDF in French, opens in a new tab)"'),
  ('href="#bascule">Bascule</a>', 'href="#bascule">Migration</a>'),
  ('href="#parcours">Parcours</a>', 'href="#parcours">Career</a>'),
  ('href="#competences">Compétences</a>', 'href="#competences">Skills</a>'),
  ('href="#jeu">Mission</a>', 'href="#jeu">Duels</a>'),
  ('aria-label="Ma collection"', 'aria-label="My collection"'),
  ("Activer le son", "Turn sound on"),
  ("Couper le son", "Mute"),
  ('data-action="mode">Mode jeu</button>', 'data-action="mode">Game mode</button>'),
  ('<a class="langue" href="en/" hreflang="en" lang="en" aria-label="English version">EN</a>',
   '<a class="langue" href="../" hreflang="fr" lang="fr" aria-label="Version française">FR</a>'),
  ('"Fermer le menu" : "Ouvrir le menu"', '"Close menu" : "Open menu"'),
  ('aria-label="Ouvrir le menu"', 'aria-label="Open menu"'),
  # Haut de page
  ("M'écrire", "Email me"),
  ("Télécharger mon CV", "Download my CV (French)"),
  ('Envie de jouer ? Ce portfolio a aussi un <button type="button" data-action="mode">mode jeu de cartes</button> : pioche, boosters, missions et collection.',
   'Feel like playing? This portfolio also has a <button type="button" data-action="mode">card game mode</button>: draw pile, boosters, duels and a collection.'),
  ("Pressé ? <button", "In a hurry? <button"),
  ("Passer en mode classique", "Switch to classic mode"),
  ("Passer en mode jeu de cartes", "Switch to card game mode"),
  # Ma main
  (">Ma main<", ">My hand<"),
  ("Mes certificats de formation. Touchez une carte pour la retourner<span class=\"jeu-seul\"> et l'ajouter à votre collection</span>.",
   "My training certificates. Tap a card to flip it<span class=\"jeu-seul\"> and add it to your collection</span>."),
  # Réalisations
  (">Réalisations<", ">Achievements<"),
  ("Ce que j'ai concrètement mis en place.", "What I actually delivered."),
  ("Lire l'étude de cas", "Read the case study"),
  # Étude de cas
  (">La bascule IZY → PSA<", ">The IZY → PSA migration<"),
  ("Étude de cas. Avec les équipes de l'UMS et d'Assia, nous avons changé le logiciel métier de la mutuelle : toutes les données mutualistes sont passées d'IZY Protect à ASSIA PSA.",
   "Case study. Together with the UMS and Assia teams, we replaced the mutual's core software: all member data moved from IZY Protect to ASSIA PSA."),
  ("<b>6 mois</b><span>pour basculer</span><p>Reprise, contrôle et mise en service des données mutualistes dans ASSIA PSA.</p>",
   "<b>6 months</b><span>to switch over</span><p>Takeover, checks and go-live of member data in ASSIA PSA.</p>"),
  ("<b>1 an</b><span>pour adapter et maîtriser</span><p>Ajustements, nouveaux paramétrages et autonomie des équipes sur l'outil.</p>",
   "<b>1 year</b><span>to adapt and master it</span><p>Adjustments, new configuration and team autonomy on the tool.</p>"),
  ("<span>garanties paramétrées</span><p>Et plus de 100 requêtes et extractions pour contrôler et piloter.</p>",
   "<span>benefits configured</span><p>And more than 100 queries and extractions to check and steer.</p>"),
  ("Ce qu'implique une bascule de mutuelle", "What a health mutual migration involves"),
  ('<h3 class="cas__sous">Mon rôle</h3>', '<h3 class="cas__sous">My role</h3>'),
  ("<li>Reprise, contrôle et fiabilisation des données, avant et après la bascule</li>", "<li>Data takeover, checks and cleanup, before and after the switchover</li>"),
  ("<li>Paramétrage de plus de 500 garanties dans ASSIA</li>", "<li>Configuration of more than 500 benefits in ASSIA</li>"),
  ("<li>Participation au basculement des flux</li>", "<li>Took part in switching the data flows over</li>"),
  ("<li>Mise en place des extranets</li>", "<li>Set up the extranets</li>"),
  ("<li>Mise en place de l'échange comptable avec génération des bordereaux</li>", "<li>Set up the accounting exchange with slip generation</li>"),
  ("<li>Plus de 100 requêtes et extractions pour contrôler et suivre l'activité</li>", "<li>More than 100 queries and extractions to check and monitor activity</li>"),
  ("<li>Support et accompagnement des utilisateurs pendant et après le changement</li>", "<li>User support and coaching during and after the change</li>"),
  ("Exemple de contrôle", "Sample check"),
  ("Exemple simplifié et anonymisé du type de requête utilisé pour vérifier qu'aucun adhérent ne s'est perdu pendant la reprise.",
   "A simplified, anonymised example of the kind of query used to make sure no member got lost during the takeover."),
  ("-- Adhérents présents dans l'ancien système mais absents du nouveau", "-- Members present in the old system but missing from the new one"),
  ("<b>Le résultat :</b> la mutuelle a changé de logiciel en 6 mois, sans perdre ses données, et les équipes maîtrisaient l'outil un an plus tard.",
   "<b>The result:</b> the mutual changed software in 6 months without losing its data, and the teams had mastered the tool a year later."),
  ('Mon rôle : ${esc(e.moi)}', 'My role: ${esc(e.moi)}'),
  ('<p class="article-lien"><a href="articles/changer-logiciel-metier-mutuelle.html">Lire la checklist complète : changer le logiciel métier d\'une mutuelle</a> · <a href="articles/">Tous mes articles</a></p>',
   '<p class="article-lien"><a href="../articles/changer-logiciel-metier-mutuelle.html" hreflang="fr">Read the full checklist (in French): changing a health mutual\'s core software</a> · <a href="../articles/" hreflang="fr">All my articles (in French)</a></p>'),
  # Projets
  (">Projets<", ">Projects<"),
  ("Ce que je construis à côté de mon métier.", "What I build alongside my job."),
  ('p.nom === "Mon entreprise"', 'p.nom === "My company"'),
  ("Voir le projet", "View the project"),
  # Parcours
  ('id="t-parcours">Parcours<', 'id="t-parcours">Career<'),
  ("Piochez les cartes une par une, du lycée à aujourd'hui.", "Draw the cards one by one, from high school to today."),
  ("<b>Piocher</b>", "<b>Draw</b>"),
  ('data-action="tout-piocher">Tout piocher<', 'data-action="tout-piocher">Draw all<'),
  ('aria-label="Cartes du parcours piochées"', 'aria-label="Career cards drawn"'),
  ("Premières expériences, 2011 – 2019", "Early experience, 2011 – 2019"),
  ('${p.fin ? " à " + esc(p.fin) : ""}', '${p.fin ? " to " + esc(p.fin) : ""}'),
  ('${c.fin ? "à " + esc(c.fin) : ""}', '${c.fin ? "to " + esc(c.fin) : ""}'),
  ('${p.fin ? "à " + esc(p.fin) : ""}', '${p.fin ? "to " + esc(p.fin) : ""}'),
  (". Voir le détail.", ". See details."),
  ('`${reste} carte${reste > 1 ? "s" : ""}` : "Paquet vide"', '`${reste} card${reste > 1 ? "s" : ""}` : "Empty deck"'),
  ('`Piocher la prochaine carte du parcours, ${reste} restante${reste > 1 ? "s" : ""}` : "Paquet vide"', '`Draw the next career card, ${reste} left` : "Empty deck"'),
  ("Le terrain est vide. Piochez votre première carte !", "The field is empty. Draw your first card!"),
  ("`<li>${esc(a)} : <b>", "`<li>${esc(a)}: <b>"),
  # Compétences et booster
  ('aria-label="Compétences"', 'aria-label="Skills"'),
  (">Booster de compétences<", ">Skills booster<"),
  ('<h2 class="titre classique-seul">Compétences</h2>', '<h2 class="titre classique-seul">Skills</h2>'),
  ("Ouvrez un booster : cinq cartes compétences, de la rare à l'ultra rare. Trois boosters suffisent pour toutes les trouver.",
   "Open a booster: five skill cards, from rare to ultra rare. Three boosters are enough to find them all."),
  ("<b>Formations réglementaires :</b> RGPD et LCB-FT, suivies comme dans toute mutuelle.", "<b>Mandatory training:</b> GDPR and AML/CFT, as in every health mutual."),
  ('aria-label="Ouvrir le booster"', 'aria-label="Open the booster"'),
  ("<b>Compétences<br>SI santé</b><i>DG</i><small>5 cartes</small>", "<b>Health IT<br>skills</b><i>DG</i><small>5 cards</small>"),
  ('aria-label="Cartes du booster"', 'aria-label="Booster cards"'),
  ("Cliquez sur le booster pour l'ouvrir.", "Click the booster to open it."),
  ('data-action="tout-retourner" hidden>Tout retourner<', 'data-action="tout-retourner" hidden>Flip all<'),
  (">Ouvrir un autre booster<", ">Open another booster<"),
  ("Voir toutes mes compétences en liste", "See all my skills as a list"),
  ('`Booster terminé. Il reste ${reste} compétence${reste > 1 ? "s" : ""} à découvrir.` : `Toutes les compétences sont dans votre collection.`',
   '`Booster done. ${reste} skill${reste > 1 ? "s" : ""} left to find.` : `All skills are in your collection.`'),
  ("Carte face cachée ${i + 1} sur 5. Retourner.", "Face-down card ${i + 1} of 5. Flip it."),
  ("Cliquez sur chaque carte pour la retourner.", "Click each card to flip it."),
  ('`Encore ${reste} carte${reste > 1 ? "s" : ""} à retourner.`', '`${reste} more card${reste > 1 ? "s" : ""} to flip.`'),
  ('{ groupe: "Logiciels et données", items: ["ASSIA 360 / ASSIA PSA", "Paramétrage produit", "Oracle / SQL", "Oracle BI (Maestro)", "Migration de données"] }',
   '{ groupe: "Software and data", items: ["ASSIA 360 / ASSIA PSA", "Product configuration", "Oracle / SQL", "Oracle BI (Maestro)", "Data migration"] }'),
  ('{ groupe: "Support et méthode", items: ["Support applicatif", "Gestion des incidents", "JIRA", "Analyse fonctionnelle", "Sécurité informatique", "RGPD et LCB-FT (formations réglementaires)"] }',
   '{ groupe: "Support and method", items: ["Application support", "Incident management", "JIRA", "Functional analysis", "IT security", "GDPR and AML/CFT (mandatory training)"] }'),
  ('{ groupe: "Technique", items: ["Python", "VBA / Visual Basic", "Développement web", "Windows, Linux, macOS", "Réseau et fibre"] }',
   '{ groupe: "Technical", items: ["Python", "VBA / Visual Basic", "Web development", "Windows, Linux, macOS", "Networking and fiber"] }'),
  # Duels
  ('id="t-jeu">Missions<', 'id="t-jeu">Duels<'),
  ("Un problème vous défie en duel. Jouez la carte qui le bat. Une erreur, et il vous coûte un cœur.",
   "A problem challenges you to a duel. Play the card that beats it. One mistake costs you a heart."),
  ('aria-label="Cartes à jouer"', 'aria-label="Cards to play"'),
  ('data-action="suivante" hidden>Mission suivante<', 'data-action="suivante" hidden>Next duel<'),
  ("`Duels gagnés : ${reussies}/${M.length}`", "`Duels won: ${reussies}/${M.length}`"),
  ("`Cœurs <b", "`Hearts <b"),
  ("${v} sur ${VIES}", "${v} of ${VIES}"),
  ('e === 0 ? "Duelliste légendaire" : e <= 2 ? "Duelliste confirmé" : "Apprenti duelliste"', 'e === 0 ? "Legendary duelist" : e <= 2 ? "Seasoned duelist" : "Apprentice duelist"'),
  ('"Fin du tournoi"', '"Tournament over"'),
  ('"Cinq duels, zéro erreur. On travaille ensemble ?" : `Cinq duels gagnés, ${erreurs} erreur${erreurs > 1 ? "s" : ""}. On en parle ?`',
   '"Five duels, zero mistakes. Shall we work together?" : `Five duels won, ${erreurs} mistake${erreurs > 1 ? "s" : ""}. Shall we talk?`'),
  ("`Écrivez-moi : <a", "`Email me: <a"),
  ('suivante.textContent = "Rejouer"', 'suivante.textContent = "Play again"'),
  ('m.adversaire || "Problème"', 'm.adversaire || "Problem"'),
  ("`Duel ${i + 1} sur ${M.length}`", "`Duel ${i + 1} of ${M.length}`"),
  ('aria-label="Jouer la carte ${esc(c.nom)}"', 'aria-label="Play the card ${esc(c.nom)}"'),
  ('pied: [RARETE[c.rarete], "Jouer"]', 'pied: [RARETE[c.rarete], "Play"]'),
  ("<b>Duel gagné !</b>", "<b>Duel won!</b>"),
  ('"Duel suivant" : "Voir le résultat"', '"Next duel" : "See the result"'),
  ("<b>Riposte ! Vous perdez un cœur.</b> Indice : ", "<b>Counterattack! You lose a heart.</b> Hint: "),
  # Collection et trophées
  ("Chaque carte découverte rejoint l'album. Complétez-le pour débloquer la carte secrète.", "Every card you find joins the album. Complete it to unlock the secret card."),
  ('aria-label="Progression de la collection"', 'aria-label="Collection progress"'),
  ("Cartes à trouver : certificats, parcours et booster", "Cards to find: certificates, career and boosters"),
  ('aria-label="Album de cartes"', 'aria-label="Card album"'),
  ("<h3>Trophées <span", "<h3>Trophies <span"),
  ('<ul aria-label="Trophées">', '<ul aria-label="Trophies">'),
  (">Partager mon score<", ">Share my score<"),
  ("Recommencer la collection", "Reset the collection"),
  ("Cliquez encore pour tout effacer", "Click again to erase everything"),
  ("`<b>${k}/${TOTAL}</b> : collection complète !` : `<b>${k}/${TOTAL}</b> cartes découvertes`", "`<b>${k}/${TOTAL}</b>: collection complete!` : `<b>${k}/${TOTAL}</b> cards found`"),
  ('. Voir la carte."', '. See the card."'),
  ('"Carte secrète verrouillée" : `Carte inconnue, à trouver dans ${c.ouTexte}`', '"Secret card locked" : `Unknown card, found in ${c.ouTexte}`'),
  ('`Il manque <b>${TOTAL - S.trouvees.size}</b> carte${TOTAL - S.trouvees.size > 1 ? "s" : ""} pour débloquer la carte secrète.`',
   '`<b>${TOTAL - S.trouvees.size}</b> card${TOTAL - S.trouvees.size > 1 ? "s" : ""} left to unlock the secret card.`'),
  ('`Cette carte se trouve dans <b>${x.ouTexte}</b>.`, "Y aller"', '`This card is in <b>${x.ouTexte}</b>.`, "Go there"'),
  ('ok ? "débloqué" : "à débloquer"', 'ok ? "unlocked" : "locked"'),
  ("`Trophée débloqué : <b>", "`Trophy unlocked: <b>"),
  ("`J'ai trouvé ${S.trouvees.size}/${TOTAL} cartes et ${S.trophees.size}/${C.trophees.length} trophées sur le portfolio-jeu de Dimitri Gigan. À toi de jouer !`",
   "`I found ${S.trouvees.size}/${TOTAL} cards and ${S.trophees.size}/${C.trophees.length} trophies in Dimitri Gigan's card game portfolio. Your turn!`"),
  ('title: "Portfolio de Dimitri Gigan"', 'title: "Dimitri Gigan\'s portfolio"'),
  ("Texte et lien copiés. <b>Il n'y a plus qu'à les coller.</b>", "Text and link copied. <b>Just paste them.</b>"),
  ("`Copiez ce lien : <b>", "`Copy this link: <b>"),
  ('"Cartes précédentes" : "Cartes suivantes"', '"Previous cards" : "Next cards"'),
  ('defileur($(".main-cartes"), "certificats"); defileur($(".enjeux"), "migration challenges"); defileur(terrain, "parcours");', 'defileur($(".main-cartes"), "certificates"); defileur($(".enjeux"), "migration challenges"); defileur(terrain, "career");'),
  # Notifications et cartes
  ("`Nouvelle carte : <b>", "`New card: <b>"),
  ('"Collection complète ! <b>La carte secrète est débloquée.</b>", "La voir"', '"Collection complete! <b>The secret card is unlocked.</b>", "See it"'),
  ("`Ma collection : ${S.trouvees.size} cartes sur ${TOTAL}`", "`My collection: ${S.trouvees.size} of ${TOTAL} cards`"),
  ("Carte joueur de ${esc(J.nom)} : ", "Player card of ${esc(J.nom)}: "),
  ('aria-label="Certificat ${esc(c.nom)}. Retourner la carte."', 'aria-label="Certificate ${esc(c.nom)}. Flip the card."'),
  ("Voir le certificat (PDF)", "View the certificate (PDF, in French)"),
  ('{ commune: "Commune", rare: "Rare", super: "Super rare", ultra: "Ultra rare", secrete: "Rare secrète" }',
   '{ commune: "Common", rare: "Rare", super: "Super rare", ultra: "Ultra rare", secrete: "Secret rare" }'),
  ('effet = "Effet" }', 'effet = "Effect" }'),
  ('c.effetLabel || "Effet"', 'c.effetLabel || "Effect"'),
  ('sorte: "cert", type: "Certificat"', 'sorte: "cert", type: "Certificate"'),
  ('ouTexte: "les certificats"', 'ouTexte: "the certificates"'),
  ('effetLabel: p.type === "Formation" ? "Diplôme" : "Rôle", ou: "#parcours", ouTexte: "la pioche du parcours"',
   'effetLabel: p.type === "Education" ? "Degree" : "Role", ou: "#parcours", ouTexte: "the career draw pile"'),
  ('sorte: "comp", type: "Compétence"', 'sorte: "comp", type: "Skill"'),
  ('ouTexte: "les boosters"', 'ouTexte: "the boosters"'),
  ('type: "Carte secrète"', 'type: "Secret card"'),
  ('pied: ["Rare secrète", "★"]', 'pied: ["Secret rare", "★"]'),
  # Modes
  ('`<span class="mode__l">Mode jeu</span><span class="mode__c">Jouer</span>` : `<span class="mode__l">Mode classique</span><span class="mode__c">Classique</span>`',
   '`<span class="mode__l">Game mode</span><span class="mode__c">Play</span>` : `<span class="mode__l">Classic mode</span><span class="mode__c">Classic</span>`'),
  ('"Mode jeu activé. <b>Bonne partie !</b>" : "Mode classique : tout le parcours en liste."', '"Game mode on. <b>Have fun!</b>" : "Classic mode: the whole career as a list."'),
  # Contact, pied de page, visionneuse
  (">Travaillons ensemble<", ">Let's work together<"),
  ("Un projet sur ASSIA, une migration de données ou du support applicatif ? Écrivez-moi.", "A project on ASSIA, a data migration or application support? Email me."),
  ('aria-label="Fermer"', 'aria-label="Close"'),
  ("Activez JavaScript pour voir le portfolio, ou écrivez-moi : ", "Turn on JavaScript to see the portfolio, or email me: "),
]

manquantes = []
for a, b in PAIRES:
    if a not in html:
        manquantes.append(a)
        continue
    html = html.replace(a, b)
if manquantes:
    print("Textes français introuvables (mettre outils/build_en.py à jour) :")
    for m in manquantes: print("  -", m[:110])
    sys.exit(1)

# 3. Chemins : la page anglaise est dans en/, les fichiers restent à la racine
html = re.sub(r'(?<![\w/.])assets/', '../assets/', html)

sortie = RACINE / "en" / "index.html"
sortie.parent.mkdir(exist_ok=True)
sortie.write_text(html, encoding="utf-8")
print("OK :", sortie.relative_to(RACINE), len(html), "caractères")
