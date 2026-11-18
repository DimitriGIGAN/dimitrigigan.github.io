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
      "Je travaille sur les systèmes d'information des mutuelles et de l'assurance santé. Chez UMS Réunion, j'ai été pendant trois ans le référent interne du logiciel de gestion ASSIA : paramétrage, support aux utilisateurs, migration et fiabilisation des données avec Oracle Maestro et SQL."
  },

  // La "main" de cartes en haut de page : les certifications ASSIA
  certifications: {
    nom: "ASSIA 360",
    emetteur: "ASSIA, logiciel de gestion santé et assurance",
    date: "Août 2023",
    // Valeurs communes affichées en bas de chaque carte (comme ATK/DEF, mais à toi)
    stats: [["Obtenue", "2023"], ["Pratique", "3 ans"]],
    /*
      Pour chaque module :
      - niveau : nombre d'étoiles (1 à 10), ton niveau de maîtrise
      - rarete : "rare", "super", "ultra" ou "secrete" (effet brillant de plus en plus fort)
      - effet : le petit texte façon jeu de cartes sur la face
      - detail : l'explication au verso (quand on clique sur la carte)
      Les niveaux et raretés ci-dessous sont des exemples : mets les tiens.
    */
    modules: [
      { titre: "Paramétrage métier", niveau: 9, rarete: "secrete",
        effet: "Quand une nouvelle garantie arrive, configure contrats, droits et règles sans écrire une ligne de code.",
        detail: "Configuration des contrats, des prestations, des droits et des règles de gestion dans le logiciel." },
      { titre: "Prestations santé", niveau: 7, rarete: "rare",
        effet: "Chaque remboursement passe un contrôle avant d'arriver chez l'adhérent.",
        detail: "Traitement et contrôle des remboursements santé des adhérents." },
      { titre: "Contrats santé", niveau: 7, rarete: "rare",
        effet: "Crée, fait évoluer ou clôture un contrat en gardant tout l'historique intact.",
        detail: "Création, suivi et évolution des contrats et des garanties." },
      { titre: "Exploitation applicative", niveau: 6, rarete: "super",
        effet: "Tant que cette carte est en jeu, les traitements tournent et les données restent cohérentes.",
        detail: "Suivi des traitements, contrôle des données et continuité de service." },
      { titre: "Support utilisateur", niveau: 8, rarete: "ultra",
        effet: "Quand un utilisateur est bloqué, diagnostique l'incident. Il repart avec la solution.",
        detail: "Diagnostic, résolution des incidents et accompagnement des équipes." },
      { titre: "Administration fonctionnelle", niveau: 6, rarete: "super",
        effet: "Gère droits et référentiels : chacun voit exactement ce dont il a besoin.",
        detail: "Gestion des droits, des référentiels et de la cohérence du paramétrage." }
    ]
  },

  experiences: [
    {
      entreprise: "UMS Réunion",
      poste: "Technicien informatique polyvalent, référent interne du logiciel ASSIA",
      periode: "Juil. 2023 – sept. 2026",
      lieu: "Saint-Denis",
      missions: [
        "Référent interne du logiciel de gestion ASSIA (mutuelle et assurance santé) : paramétrage, maintenance et support",
        "Paramétrage métier des contrats, prestations, droits et règles de gestion",
        "Projets de migration, reprise et bascule de données, avec contrôle et fiabilisation avant et après migration",
        "Requêtes SQL et rapports Oracle BI (Maestro) pour analyser les données et suivre l'activité",
        "Incidents applicatifs et de sécurité suivis dans JIRA : analyse, priorisation, résolution",
        "Scripts et outils pour automatiser des tâches et fiabiliser les processus IT",
        "Respect des politiques de sécurité et contribution à la gestion des risques"
      ]
    },
    {
      entreprise: "Caisse des écoles",
      poste: "Informaticien",
      periode: "Nov. 2021 – oct. 2022",
      lieu: "Saint-Denis",
      missions: [
        "Support informatique aux équipes",
        "Développement d'outils internes en Visual Basic et Python"
      ]
    },
    {
      entreprise: "DPEG",
      poste: "Service civique",
      periode: "Mai 2016 – déc. 2017",
      lieu: "La Réunion",
      missions: ["Appui aux activités informatiques et administratives"]
    }
  ],

  formations: [
    {
      ecole: "Simplon.co",
      diplome: "Titre professionnel Développeur web / multimédia, management et webmaster",
      periode: "2020 – 2021"
    },
    {
      ecole: "Lycée professionnel Julien de Rontaunay",
      diplome: "Baccalauréat professionnel Gestion administration (et BEP MSA en 2014)",
      periode: "2012 – 2015"
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
