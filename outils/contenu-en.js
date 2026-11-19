const CONTENU = {
  identite: {
    nom: "Dimitri Gigan",
    metier: "Health insurance IT technician",
    dispo: "Available",
    pitch: "I work on the software that health mutuals run on. Over three years at UMS Réunion, I took part in the <b>migration of the mutual's core management software</b> (from IZY Protect to ASSIA PSA), configured <b>more than 500 coverage benefits</b> and wrote <b>more than 100 queries and data extractions</b> for the mutual.",
    email: "__EMAIL__",
    ville: "Saint-Denis, Réunion Island",
    cv: "assets/CV-Dimitri-Gigan.pdf",
    linkedin: "https://www.linkedin.com/in/dimitri-gigan"
  },

  carteJoueur: {
    type: "Player card",
    nom: "Dimitri Gigan",
    etoiles: 8,
    rarete: "secrete",
    effet: "Configures, migrates and cleans up health mutual data. Users never stay stuck.",
    stats: [["Benefits", "500+"], ["Queries", "100+"]],
    pied: ["Health IT technician", "974"]
  },

  certificats: [
    { id: "cert-assia360", nom: "ASSIA 360° training", etoiles: 8, rarete: "ultra", icone: "plateforme",
      effet: "Unlocks the whole management platform for health mutuals and insurers.",
      detail: "Training on the ASSIA 360 platform, the management software used by health mutuals and insurers.",
      meta: "7 h, in person, 18 August 2023, Cimut (Assia)", fichier: "assets/certificats/certificat-assia-360.pdf" },
    { id: "cert-parametrage", nom: "Product configuration", etoiles: 9, rarete: "secrete", icone: "reglages",
      effet: "When a new benefit arrives, sets up contracts, rights and rules without a single line of code.",
      detail: "Training on product configuration in ASSIA: contracts, benefits, payouts and management rules.",
      meta: "21 h, in person, 21 to 23 August 2023, Cimut (Assia)", fichier: "assets/certificats/certificat-parametrage-produit.pdf" },
    { id: "cert-jira", nom: "JIRA", etoiles: 7, rarete: "super", icone: "ticket",
      effet: "No request gets lost: each one has a status, a priority and a next step.",
      detail: "Training on tracking requests and incidents in JIRA.",
      meta: "3 h, remote, 21 December 2023, Cimut (Assia)", fichier: "assets/certificats/certificat-jira.pdf" }
  ],

  realisations: [
    { valeur: "IZY → PSA", rarete: "ultra", titre: "Core software migration", texte: "Switched from IZY Protect to ASSIA PSA in 6 months, then mastered the tool within a year.", lien: "#bascule" },
    { valeur: "500+", rarete: "ultra", titre: "Coverage benefits configured", texte: "More than 500 benefits set up in ASSIA." },
    { valeur: "100+", rarete: "ultra", titre: "Queries and extractions", texte: "Written for the mutual, to monitor and check its data." },
    { valeur: "Accounts", rarete: "super", titre: "Accounting exchange", texte: "Set up the exchange with accounting and the generation of transaction slips." },
    { valeur: "Flows", rarete: "super", titre: "Data flow switchover", texte: "Took part in switching the data flows over during the software change." },
    { valeur: "Web", rarete: "super", titre: "Extranets", texte: "Set up the mutual's extranets." },
    { valeur: "Fiber", rarete: "rare", titre: "Saint-Denis schools", texte: "Took part in moving every primary school and nursery school from ADSL to fiber (Caisse des écoles)." }
  ],

  parcours: [
    { id: "p-lycee", annee: "2012", fin: "2015", type: "Education", rarete: "commune", nom: "Lycée Julien de Rontaunay", role: "Vocational baccalaureate in business administration (BEP MSA in 2014)", points: [] },
    { id: "p-dpeg", annee: "2016", fin: "2017", type: "Experience", rarete: "commune", nom: "DPEG", role: "Civic service: IT and administrative support", points: [] },
    { id: "p-simplon", annee: "2020", fin: "2021", type: "Education", rarete: "rare", nom: "Simplon.co", role: "Professional certificate in web and multimedia, management and webmaster (level 3)", points: [] },
    { id: "p-caisse", annee: "2021", fin: "2022", type: "Experience", rarete: "super", nom: "Caisse des écoles", role: "IT technician",
      points: [
        "Moved the primary and nursery schools of Saint-Denis from ADSL to fiber",
        "IT support for the staff",
        "Internal tools in Visual Basic and Python"
      ] },
    { id: "p-ums", annee: "2023", fin: "2026", type: "Experience", rarete: "ultra", nom: "UMS Réunion", role: "IT technician (health mutual)",
      points: [
        "Migration from IZY Protect to ASSIA PSA: data takeover, checks and cleanup",
        "More than 500 benefits configured, extranets, data flow switchover, accounting exchange",
        "More than 100 queries and extractions written for the mutual",
        "Configuration, maintenance and support of the ASSIA core software",
        "Oracle BI reports (Maestro), incidents tracked in JIRA",
        "User support, automation scripts, IT security"
      ] }
  ],

  enjeux: [
    { icone: "base", titre: "Member data",
      texte: "Members, dependants, contracts, subscribed benefits, contributions, reimbursement history: everything has to move to the new software without getting lost or changing meaning. Old codes must be mapped to new ones, checked before, checked after, and every gap fixed.",
      moi: "Data takeover, checks and cleanup." },
    { icone: "reglages", titre: "Configuration",
      texte: "Every benefit and every management rule has to be rebuilt in ASSIA so the same treatment is reimbursed exactly as before. One configuration mistake means one member paid the wrong amount.",
      moi: "More than 500 benefits configured." },
    { icone: "reseau", titre: "Data flows",
      texte: "A mutual exchanges data all the time: statements from the national health insurance, direct payment with healthcare providers, contribution debits, reimbursement transfers, partner files. Each flow has to be reconnected to the new software with no break: on switchover day, reimbursements keep going.",
      moi: "Took part in switching the flows over." },
    { icone: "plateforme", titre: "Extranets",
      texte: "Members check their reimbursements, certificates and documents online. These spaces have to be reconnected to the new data, with the same access, without the member having to redo anything.",
      moi: "Set up the extranets." },
    { icone: "graphique", titre: "Accounting",
      texte: "Every contribution collected and every benefit paid creates accounting entries. The new software has to feed accounting with correct slips, or the mutual's books stop balancing.",
      moi: "Accounting exchange and slip generation." },
    { icone: "valide", titre: "Checks and reporting",
      texte: "Before, during and after the switchover, you must be able to prove everything is right: counts, comparisons, anomaly lists, dashboards for management.",
      moi: "More than 100 queries and extractions." },
    { icone: "casque", titre: "Users",
      texte: "The management teams keep processing files during the change. They need training, answers to their questions and fast incident fixes until the tool is mastered.",
      moi: "Support, incidents tracked in JIRA, coaching." },
    { icone: "bouclier", titre: "Data protection",
      texte: "This is health data: transfers, access rights and test environments must comply with GDPR and security rules at every step.",
      moi: "Compliance with security policies and GDPR." }
  ],

  projets: [
    { nom: "My company", etat: "Coming soon", rarete: "secrete", logo: "",
      texte: "My business project is in the works. More details very soon.", lien: "" },
    { nom: "Lâcher la mise", etat: "In progress", rarete: "ultra", logo: "",
      texte: "Ongoing project. More details soon.", lien: "" },
    { nom: "This portfolio", etat: "Live", rarete: "super", logo: "",
      texte: "A portfolio shaped like a card game, built in HTML, CSS and JavaScript with no library at all: draw pile, boosters, duels and a collection.", lien: "https://github.com/DimitriGIGAN/dimitrigigan.github.io" }
  ],

  anciens: [
    ["2019", "Carrefour Market", "warehouse worker"],
    ["2014 – 2015", "Oceina Assurance", "mail, phone, claims"],
    ["2013 – 2014", "PEEP Sainte-Clotilde", "invoicing, reception, filing"],
    ["2013", "JIR, Journal de l'île", "subscriptions, stock, advertising"],
    ["2012", "GET 974", "reception, phone, bookkeeping"],
    ["2011", "ODOM Services", "reception and switchboard"]
  ],

  competences: [
    { id: "sql", nom: "Oracle / SQL", icone: "base", etoiles: 8, rarete: "ultra", effet: "One query is enough to find the member, the contract or the hidden anomaly." },
    { id: "migration", nom: "Data migration", icone: "base", etoiles: 8, rarete: "ultra", effet: "Takes over, checks and moves data from one system to another without losing any." },
    { id: "bi", nom: "Oracle BI (Maestro)", icone: "graphique", etoiles: 7, rarete: "super", effet: "Turns data into reports that management actually reads." },
    { id: "fiabilisation", nom: "Data cleanup", icone: "valide", etoiles: 7, rarete: "super", effet: "Before every switchover, every record is checked. After it too." },
    { id: "support", nom: "Application support", icone: "casque", etoiles: 8, rarete: "super", effet: "When the software fights back, diagnoses, explains and gets the team working again." },
    { id: "compta", nom: "Accounting exchange", icone: "graphique", etoiles: 7, rarete: "super", effet: "Slips go to accounting, correct and on time." },
    { id: "incidents", nom: "Incident management", icone: "alerte", etoiles: 7, rarete: "rare", effet: "Analyses, prioritises, solves. The next ticket can come." },
    { id: "analyse", nom: "Functional analysis", icone: "graphique", etoiles: 6, rarete: "rare", effet: "Turns business teams' needs into concrete configuration." },
    { id: "securite", nom: "IT security", icone: "bouclier", etoiles: 6, rarete: "rare", effet: "Applies security policies and spots risks." },
    { id: "auto", nom: "Automation", icone: "engrenage", etoiles: 6, rarete: "super", effet: "A repetitive task becomes a script. The team gets its time back." },
    { id: "python", nom: "Python", icone: "code", etoiles: 6, rarete: "rare", effet: "Writes the small tools that save hours every week." },
    { id: "vba", nom: "VBA / Visual Basic", icone: "code", etoiles: 6, rarete: "rare", effet: "Automates Excel files and internal tools." },
    { id: "web", nom: "Web development", icone: "code", etoiles: 5, rarete: "commune", effet: "HTML, CSS, JavaScript: this portfolio is the proof." },
    { id: "systemes", nom: "Windows, Linux, macOS", icone: "ecran", etoiles: 6, rarete: "commune", effet: "Installs, troubleshoots and configures workstations." },
    { id: "reseau", nom: "Networking and fiber", icone: "reseau", etoiles: 6, rarete: "rare", effet: "From the cable to the workstation, gets the connection back up." }
  ],

  missions: [
    { adversaire: "The Great Switchover", texte: "The mutual is changing its core software: all the data must be taken over without losing a single record.", bonne: "migration", autres: ["support", "web"],
      bravo: "That's what I did at UMS Réunion, during the migration from IZY Protect to ASSIA PSA.", indice: "It's about taking over, checking and moving data." },
    { adversaire: "The Phantom Benefit", texte: "A new optical benefit has to be offered to members next month.", bonne: "cert-parametrage", autres: ["reseau", "auto"],
      bravo: "I configured more than 500 benefits in ASSIA.", indice: "It's not development: it's a benefit to configure." },
    { adversaire: "The Duplicate Twins", texte: "Duplicate member records are skewing the mutual's statistics.", bonne: "sql", autres: ["support", "web"],
      bravo: "I wrote more than 100 queries and extractions for UMS.", indice: "You need to query the database." },
    { adversaire: "The Morning Freeze", texte: "A department hasn't been able to enter reimbursements since this morning.", bonne: "support", autres: ["bi", "web"],
      bravo: "Diagnosis, fix and user coaching: my daily work, tracked in JIRA.", indice: "Users are stuck: they need to be unblocked." },
    { adversaire: "The Snail Connection", texte: "The city's schools have a connection too slow to work with.", bonne: "reseau", autres: ["sql", "cert-parametrage"],
      bravo: "I took part in moving every primary and nursery school in Saint-Denis from ADSL to fiber.", indice: "It's a network infrastructure issue." }
  ],

  trophees: [
    { id: "premiere", nom: "First card", texte: "Find your first card.", icone: "etoile" },
    { id: "main", nom: "Full hand", texte: "Flip all three certificates.", icone: "cartes" },
    { id: "parcours", nom: "The whole story", texte: "Draw the entire career.", icone: "chemin" },
    { id: "ultra", nom: "Lucky pull", texte: "Find an ultra rare card in a booster.", icone: "eclair" },
    { id: "boosters", nom: "Collector", texte: "Open three boosters.", icone: "paquet" },
    { id: "duel", nom: "Duelist", texte: "Win all five duels.", icone: "epees" },
    { id: "sansfaute", nom: "Flawless", texte: "Win all five duels without losing a heart.", icone: "couronne" },
    { id: "complet", nom: "Complete album", texte: "Find every card and see the secret card.", icone: "trophee" }
  ],

  carteSecrete: {
    nom: "Contact me",
    effet: "When this card is played, a health IT technician joins your project.",
    message: "Well done, you completed the whole collection! Thanks for playing to the end. Let's talk about your project."
  }
};
