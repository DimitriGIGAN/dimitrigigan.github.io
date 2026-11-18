/*
  ============================================================
  CONTENU DU PORTFOLIO
  C'est le seul fichier à modifier pour mettre le site à jour.
  - Pour ajouter une expérience : copie un bloc { ... } dans
    "experiences" et change les textes (le plus récent en haut).
  - Les guillemets " et les virgules entre les blocs sont importants.
  ============================================================
*/
window.PORTFOLIO = {
  identite: {
    prenom: "Dimitri",
    nom: "Gigan",
    titre: "Technicien informatique SI santé",
    ville: "Saint-Denis, La Réunion",
    email: "dimitrigigan@gmail.com",
    linkedin: "https://www.linkedin.com/in/dimitri-gigan",
    cv: "assets/CV-Dimitri-Gigan.pdf",
    // Logo affiché dans la barre du haut et au dos des cartes (laisse vide "" pour afficher tes initiales)
    logo: "",
    // Mets disponible: false pour masquer le badge de disponibilité
    disponible: true,
    disponibilite: "Ouvert à un nouveau poste, sur site, en hybride ou à distance",
    accroche:
      "Je travaille sur les systèmes d'information des mutuelles et de l'assurance santé. J'ai les certificats de formation ASSIA 360 et Paramétrage produit délivrés par l'éditeur du logiciel. Pendant trois ans chez UMS Réunion, j'ai participé à la bascule d'IZY Protect vers ASSIA PSA, paramétré plus de 500 garanties et créé plus de 70 % des extractions et requêtes de la mutuelle."
  },

  // La "main" de cartes en haut de page : tes certificats de formation
  certifications: {
    // Phrase affichée sous les cartes
    resume: "3 certificats de formation délivrés en 2023 par le Cimut, l'éditeur du logiciel ASSIA.",
    /*
      Pour chaque certificat :
      - id : identifiant unique (ne pas changer, il sert à la collection et aux missions)
      - niveau : nombre d'étoiles (1 à 10), ton niveau de maîtrise
      - rarete : "rare", "super", "ultra" ou "secrete" (effet brillant de plus en plus fort)
      - effet : le petit texte façon jeu de cartes sur la face
      - detail : l'explication au verso (quand on clique sur la carte)
      - fichier : le PDF du certificat (dans assets/certificats)
      Les niveaux, raretés et effets sont des exemples : mets les tiens.
    */
    modules: [
      { id: "cert-assia360", titre: "Formation ASSIA 360°", niveau: 8, rarete: "ultra",
        organisme: "Cimut (Assia)", duree: "7 h", date: "18 août 2023", modalite: "Présentiel",
        effet: "Donne accès à toute la plateforme de gestion santé et assurance des mutuelles.",
        detail: "Formation à la plateforme ASSIA 360, le logiciel de gestion des mutuelles et de l'assurance santé.",
        fichier: "assets/certificats/certificat-assia-360.pdf" },
      { id: "cert-parametrage", titre: "Paramétrage produit", niveau: 9, rarete: "secrete",
        organisme: "Cimut (Assia)", duree: "21 h", date: "21 au 23 août 2023", modalite: "Présentiel",
        effet: "Quand une nouvelle garantie arrive, configure contrats, droits et règles sans écrire une ligne de code.",
        detail: "Formation au paramétrage des produits dans ASSIA : contrats, garanties, prestations et règles de gestion.",
        fichier: "assets/certificats/certificat-parametrage-produit.pdf" },
      { id: "cert-jira", titre: "JIRA", niveau: 7, rarete: "super",
        organisme: "Cimut (Assia)", duree: "3 h", date: "21 décembre 2023", modalite: "À distance",
        effet: "Aucune demande ne se perd : chacune a un statut, une priorité et une suite.",
        detail: "Formation au suivi des demandes et des incidents dans JIRA.",
        fichier: "assets/certificats/certificat-jira.pdf" }
    ]
  },

  experiences: [
    {
      entreprise: "UMS Réunion",
      poste: "Technicien informatique polyvalent",
      periode: "Juil. 2023 – sept. 2026",
      debut: 2023, // sert à l'ordre de la pioche
      lieu: "Saint-Denis",
      missions: [
        "Bascule de données lors du changement de logiciel métier, d'IZY Protect vers ASSIA PSA : reprise, contrôle et fiabilisation avant et après migration",
        "Paramétrage de plus de 500 garanties",
        "Mise en place des extranets et participation au basculement des flux",
        "Mise en place de l'échange comptable avec génération des bordereaux",
        "Création de plus de 70 % des extractions et requêtes de l'UMS",
        "Paramétrage, maintenance et support du logiciel métier ASSIA (mutuelle et assurance santé)",
        "Paramétrage métier des contrats, prestations, droits et règles de gestion",
        "Requêtes SQL et rapports Oracle BI (Maestro) pour analyser les données et suivre l'activité",
        "Incidents applicatifs et de sécurité suivis dans JIRA : analyse, priorisation, résolution",
        "Scripts et outils pour automatiser des tâches et fiabiliser les processus IT",
        "Respect des politiques de sécurité et contribution à la gestion des risques"
      ]
    },
    {
      entreprise: "Caisse des écoles",
      poste: "Technicien informatique",
      periode: "Nov. 2021 – oct. 2022",
      debut: 2021,
      lieu: "Saint-Denis",
      missions: [
        "Participation au passage de l'ADSL à la fibre dans toutes les écoles primaires et maternelles de Saint-Denis",
        "Support informatique aux équipes",
        "Développement d'outils internes en Visual Basic et Python"
      ]
    },
    {
      entreprise: "DPEG",
      poste: "Service civique",
      periode: "Mai 2016 – déc. 2017",
      debut: 2016,
      lieu: "La Réunion",
      missions: ["Appui aux activités informatiques et administratives"]
    }
  ],

  formations: [
    {
      ecole: "Simplon.co",
      diplome: "Titre professionnel Développeur web / multimédia, management et webmaster",
      periode: "2020 – 2021",
      debut: 2020
    },
    {
      ecole: "Lycée professionnel Julien de Rontaunay",
      diplome: "Baccalauréat professionnel Gestion administration (et BEP MSA en 2014)",
      periode: "2012 – 2015",
      debut: 2012
    }
  ],

  // Section repliable "Premières expériences"
  premieresExperiences: [
    { entreprise: "Carrefour Market", poste: "Magasinier : caisse, rayons, boulangerie, accueil", periode: "2019" },
    { entreprise: "Oceina Assurance", poste: "Courrier, accueil téléphonique, déclarations de sinistres sur Excalibur", periode: "2014 – 2015" },
    { entreprise: "PEEP Sainte-Clotilde", poste: "Facturation, accueil, classement, préparation de chèques", periode: "2013 – 2014" },
    { entreprise: "JIR, Journal de l'île", poste: "Gestion des abonnements et des stocks, publicité", periode: "2013" },
    { entreprise: "GET 974", poste: "Accueil, téléphone, comptabilité", periode: "2012" },
    { entreprise: "ODOM Services", poste: "Accueil et standard téléphonique", periode: "2011" }
  ],

  /*
    ============================================================
    MODE JEU
    ============================================================
    Cartes compétences : elles sortent des boosters.
    - icone : "data", "chart", "check", "support", "alert", "ticket",
              "shield", "code", "screen", "network", "gear"
    - niveau, rarete, effet : comme pour les certifications.
    Les niveaux et raretés sont des exemples : mets les tiens.
  */
  cartesCompetences: [
    { id: "sql", titre: "Oracle / SQL", icone: "data", niveau: 8, rarete: "ultra",
      effet: "Une requête suffit pour retrouver l'adhérent, le contrat ou l'anomalie cachée." },
    { id: "migration", titre: "Migration de données", icone: "data", niveau: 8, rarete: "ultra",
      effet: "Reprend, contrôle et bascule les données d'un système à l'autre sans rien perdre." },
    { id: "maestro", titre: "Oracle Maestro (BI)", icone: "chart", niveau: 7, rarete: "super",
      effet: "Transforme les données en rapports que la direction lit vraiment." },
    { id: "fiabilisation", titre: "Fiabilisation des données", icone: "check", niveau: 7, rarete: "super",
      effet: "Avant chaque bascule, chaque donnée est contrôlée. Après aussi." },
    { id: "support", titre: "Support applicatif", icone: "support", niveau: 8, rarete: "super",
      effet: "Quand le logiciel résiste, diagnostique, explique et remet l'équipe au travail." },
    { id: "incidents", titre: "Gestion des incidents", icone: "alert", niveau: 7, rarete: "rare",
      effet: "Analyse, priorise, résout. Le ticket suivant peut arriver." },
    { id: "jira", titre: "JIRA", icone: "ticket", niveau: 7, rarete: "rare",
      effet: "Aucune demande ne se perd : chacune a un statut, une priorité et une suite." },
    { id: "analyse", titre: "Analyse fonctionnelle", icone: "chart", niveau: 6, rarete: "super",
      effet: "Traduit le besoin des équipes métier en paramétrage concret." },
    { id: "securite", titre: "Sécurité informatique", icone: "shield", niveau: 6, rarete: "rare",
      effet: "Applique les politiques de sécurité et repère les risques avant qu'ils coûtent cher." },
    { id: "automatisation", titre: "Automatisation", icone: "gear", niveau: 6, rarete: "super",
      effet: "Une tâche répétitive devient un script. L'équipe récupère son temps." },
    { id: "python", titre: "Python", icone: "code", niveau: 6, rarete: "super",
      effet: "Écrit les petits outils qui font gagner des heures chaque semaine." },
    { id: "vba", titre: "VBA / Visual Basic", icone: "code", niveau: 6, rarete: "rare",
      effet: "Automatise les fichiers Excel et les outils internes du quotidien." },
    { id: "web", titre: "Développement web", icone: "code", niveau: 5, rarete: "rare",
      effet: "HTML, CSS, JavaScript : ce portfolio en est la preuve." },
    { id: "systemes", titre: "Windows, Linux, macOS", icone: "screen", niveau: 6, rarete: "rare",
      effet: "Installe, dépanne et configure les postes, quel que soit le système." },
    { id: "reseau", titre: "Matériel et réseau", icone: "network", niveau: 5, rarete: "rare",
      effet: "Du câble au poste de travail, remet la connexion en état." }
  ],

  /*
    Missions du mini-duel : le visiteur tire une mission et doit jouer
    la bonne carte. "bonne" et "autres" contiennent des id de cartes
    compétences (ci-dessus) ou l'id d'un certificat ("cert-assia360", "cert-parametrage", "cert-jira").
  */
  missions: [
    { titre: "Migrer les contrats d'une mutuelle vers un nouveau logiciel sans perdre une seule donnée",
      bonne: "migration", autres: ["support", "web"],
      bravo: "Chez UMS Réunion, j'ai participé à la bascule d'IZY Protect vers ASSIA PSA : reprise, contrôle et fiabilisation des données avant et après migration.",
      indice: "Pense aux données : il faut les reprendre, les contrôler et les basculer." },
    { titre: "Une nouvelle garantie optique doit être proposée aux adhérents le mois prochain",
      bonne: "cert-parametrage", autres: ["python", "reseau"],
      bravo: "J'ai paramétré plus de 500 garanties dans ASSIA, avec le certificat Paramétrage produit de l'éditeur.",
      indice: "Ce n'est pas un problème technique : c'est une règle de gestion à configurer." },
    { titre: "Un service ne peut plus saisir de remboursements depuis ce matin",
      bonne: "support", autres: ["maestro", "vba"],
      bravo: "Diagnostic, résolution et accompagnement des utilisateurs : c'était mon quotidien, avec un suivi dans JIRA.",
      indice: "Des utilisateurs sont bloqués : il faut quelqu'un pour diagnostiquer et débloquer." },
    { titre: "La direction veut un tableau de bord mensuel des prestations versées",
      bonne: "maestro", autres: ["securite", "systemes"],
      bravo: "Je crée et j'exploite des rapports Oracle BI (Maestro) pour suivre l'activité.",
      indice: "Il s'agit de transformer des données en rapport lisible." },
    { titre: "Des doublons d'adhérents faussent les statistiques",
      bonne: "sql", autres: ["jira", "web"],
      bravo: "J'ai créé plus de 70 % des extractions et requêtes de l'UMS : repérer et corriger ce genre d'anomalie, c'est mon terrain.",
      indice: "Il faut interroger la base de données pour trouver les doublons." },
    { titre: "Une tâche répétitive prend deux heures par jour à l'équipe",
      bonne: "automatisation", autres: ["incidents", "cert-jira"],
      bravo: "J'ai développé des scripts et des outils pour automatiser ce genre de tâches et fiabiliser les processus.",
      indice: "Et si une machine faisait cette tâche à la place de l'équipe ?" }
  ],

  // La carte secrète, débloquée quand la collection est complète
  carteSecrete: {
    titre: "Me recruter",
    effet: "Quand cette carte est jouée, un technicien SI santé rejoint ton équipe.",
    message: "Bravo, tu as complété toute la collection ! Merci d'avoir joué jusqu'au bout. Parlons de votre projet."
  },

  competences: [
    { groupe: "Progiciels et données", items: ["Logiciel ASSIA 360", "Oracle Maestro (BI)", "Oracle / SQL", "Migration et transfert de données"] },
    { groupe: "Support et méthode", items: ["Paramétrage métier", "Support applicatif", "Gestion des incidents", "JIRA", "Analyse fonctionnelle", "Sécurité informatique"] },
    { groupe: "Développement et systèmes", items: ["Python", "VBA / Visual Basic", "Développement web", "Windows, Linux, macOS", "Matériel et réseau"] }
  ],

  atouts: [
    "Double compétence métier et technique",
    "Maîtrise des données Oracle",
    "Expérience des bascules de données",
    "Sens du service utilisateur",
    "Rigueur, fiabilité, amélioration continue"
  ]
};
