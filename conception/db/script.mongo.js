use echotranscribe

// mbola mila amboarina le `name`
db.createCollection("role")
db.role.insertMany([
   {
      name: "Super administrator"
   },
   {
      name: "Administrator"
   },
   {
      name: "Subalterne"
   },
   {
      name: "Independant"
   },
   {
      name: "Free plan"
   }
])

db.createCollection("user")
db.user.insertMany([
   
  {
    _id: ObjectId(),
    id: "USR-1001",
    auth0Id: "auth0|64a1f23abc001",
    name: "Dupont",
    firstName: "Jean",
    birthday: ISODate("1992-04-18"),
    mail: "jean.dupont@example.com",
    address: "12 rue des Lilas",
    country: "France",
    city: "Paris",
    zip: "75010",
    creationDate: "2024-11-02",
    roles: ["USER"]
  },
  {
    _id: ObjectId(),
    id: "USR-1002",
    auth0Id: "auth0|64a1f23abc002",
    name: "Martin",
    firstName: "Claire",
    birthday: ISODate("1988-09-03"),
    mail: "claire.martin@example.com",
    address: "45 avenue Victor Hugo",
    country: "France",
    city: "Lyon",
    zip: "69006",
    creationDate: "2024-10-15",
    roles: ["USER", "ADMIN"]
  },
  {
    _id: ObjectId(),
    id: "USR-1003",
    auth0Id: "auth0|64a1f23abc003",
    name: "Bernard",
    firstName: "Lucas",
    birthday: ISODate("2000-01-27"),
    mail: "lucas.bernard@example.com",
    address: "8 boulevard Pasteur",
    country: "Belgique",
    city: "Bruxelles",
    zip: "1000",
    creationDate: "2025-01-05",
    roles: ["USER"]
  },
  {
    _id: ObjectId(),
    id: "USR-1004",
    auth0Id: "auth0|64a1f23abc004",
    name: "Nguyen",
    firstName: "Linh",
    birthday: ISODate("1995-07-12"),
    mail: "linh.nguyen@example.com",
    address: "21 rue Nationale",
    country: "France",
    city: "Lille",
    zip: "59800",
    creationDate: "2024-12-20",
    roles: ["USER", "MODERATOR"]
  },
  {
    _id: ObjectId(),
    id: "USR-1005",
    auth0Id: "auth0|64a1f23abc005",
    name: "Leroy",
    firstName: "Antoine",
    birthday: ISODate("1990-02-11"),
    mail: "antoine.leroy@example.com",
    address: "3 rue Voltaire",
    country: "France",
    city: "Nantes",
    zip: "44000",
    creationDate: "2024-09-08",
    roles: ["USER"]
  },
  {
    _id: ObjectId(),
    id: "USR-1006",
    auth0Id: "auth0|64a1f23abc006",
    name: "Moreau",
    firstName: "Sophie",
    birthday: ISODate("1985-11-29"),
    mail: "sophie.moreau@example.com",
    address: "77 chemin des Vignes",
    country: "France",
    city: "Bordeaux",
    zip: "33000",
    creationDate: "2024-08-21",
    roles: ["USER", "ADMIN"]
  },
  {
    _id: ObjectId(),
    id: "USR-1007",
    auth0Id: "auth0|64a1f23abc007",
    name: "Rossi",
    firstName: "Marco",
    birthday: ISODate("1997-06-05"),
    mail: "marco.rossi@example.com",
    address: "15 via Roma",
    country: "Italie",
    city: "Milan",
    zip: "20100",
    creationDate: "2025-01-02",
    roles: ["USER"]
  },
  {
    _id: ObjectId(),
    id: "USR-1008",
    auth0Id: "auth0|64a1f23abc008",
    name: "Garcia",
    firstName: "Elena",
    birthday: ISODate("1993-03-19"),
    mail: "elena.garcia@example.com",
    address: "22 calle Mayor",
    country: "Espagne",
    city: "Madrid",
    zip: "28013",
    creationDate: "2024-12-11",
    roles: ["USER", "MODERATOR"]
  },
  {
    _id: ObjectId(),
    id: "USR-1009",
    auth0Id: "auth0|64a1f23abc009",
    name: "Schmidt",
    firstName: "Jonas",
    birthday: ISODate("1989-08-24"),
    mail: "jonas.schmidt@example.com",
    address: "9 Hauptstraße",
    country: "Allemagne",
    city: "Berlin",
    zip: "10115",
    creationDate: "2024-07-30",
    roles: ["USER"]
  },
  {
    _id: ObjectId(),
    id: "USR-1010",
    auth0Id: "auth0|64a1f23abc010",
    name: "Kowalski",
    firstName: "Anna",
    birthday: ISODate("1998-12-14"),
    mail: "anna.kowalski@example.com",
    address: "18 ul. Długa",
    country: "Pologne",
    city: "Gdańsk",
    zip: "80-831",
    creationDate: "2025-01-10",
    roles: ["USER"]
  }
])
const docs = [];
for (let i = 1; i <= 50; i++) {
  docs.push({
    auth0Id: `auth0|user${i}`,
    name: `Doe${i}`,
    firstName: `John${i}`,
    birthday: randomDate(
      new Date("1980-01-01"),
      new Date("2005-12-31")
    ),
    mail: `john.doe${i}@example.com`,
    address: `${i} rue de Paris`,
    country: "France",
    city: "Paris",
    zip: "75000",
    creationDate: randomDate(
      new Date("2022-01-01"),
      new Date("2026-12-31")
    ),
    lastUpdate: new Date(),
    roles: "USER"
  });
}
db.user.insertMany(docs);


// vita redis tampoka (vita AUTH0)
// db.createCollection("otp")

db.createCollection("qa")
db.qa.insertMany([
  {"about":"general", "question": "Does the app recognize accents and dialects?", "answer": "Yes, the AI can recognize different accents and dialects for supported languages."},
  {"about":"general", "question": "Can transcripts be edited directly in the app?", "answer": "Yes, an integrated editor allows you to correct and format transcripts."},
  {"about":"general", "question": "Can the app distinguish multiple speakers?", "answer": "Yes, speaker differentiation identifies and separates voices in the transcription."},
  {"about":"general", "question": "Are there file size limits for uploads?", "answer": "Yes, each file must not exceed 2 GB to ensure optimal performance."},
  {"about":"general", "question": "Does the app store user data?", "answer": "Audio files and transcripts are stored temporarily and automatically deleted after 30 days to protect privacy."},
  {"about":"general", "question": "Is the app available on mobile?", "answer": "Yes, the app is available on iOS, Android, and web browsers."},

  {"about": "transcribe", "question": "What languages does the app support?", "answer": "The app currently supports over 30 languages, including English, French, Spanish, German, and Mandarin."},
  {"about": "transcribe", "question": "Which audio formats are supported?", "answer": "Supported audio formats include MP3, WAV, FLAC, and OGG."},
  {"about": "transcribe", "question": "Which video formats can be transcribed?", "answer": "Supported video formats include MP4, MOV, AVI, and MKV."},
  {"about": "transcribe", "question": "Which AI is used for transcription?", "answer": "We use Google Cloud Speech-to-Text AI to ensure accurate and fast transcription."},
  {"about": "transcribe", "question": "What is the average transcription accuracy?", "answer": "The average accuracy is around 95% for clear and high-quality recordings."},
  {"about": "transcribe", "question": "Can long files be transcribed?", "answer": "Yes, the app can process files up to 4 hours in length."},
  {"about": "transcribe", "question": "Does the app work offline?", "answer": "No, the app requires an internet connection to use the cloud AI services."},
  {"about": "transcribe", "question": "Can transcripts be exported?", "answer": "Yes, transcripts can be exported as TXT, PDF, or SRT for subtitles."},

  {"about": "subscription", "question": "What types of subscriptions are offered?", "answer": "We offer a free limited plan and premium monthly or yearly subscriptions with advanced features."},
  {"about": "subscription", "question": "What does the free plan include?", "answer": "The free plan allows up to 30 minutes of transcription per month and basic support."},
  {"about": "subscription", "question": "What benefits does the premium subscription provide?", "answer": "The premium subscription includes unlimited transcriptions, priority support, and access to advanced audio and video processing features."},
  {"about": "subscription", "question": "Which payment methods are accepted?", "answer": "We accept credit cards (Visa, Mastercard, American Express) as well as PayPal and Google Pay."},
  {"about": "subscription", "question": "Is payment secure?", "answer": "Yes, all transactions are encrypted with SSL and processed by trusted payment providers."},
  {"about": "subscription", "question": "Can I cancel my subscription?", "answer": "Yes, you can cancel anytime from your account dashboard without additional fees."},
])


db.createCollection("subscription_type")
db.subscription_type.insertMany([
   {
      name: "Free plan",
      description: ["Transcribe in 125+ languages", "3 min of transcription only", "Limited format supported"]
   },
   {
      name: "Pro",
      description: ["Transcribe in 125+ languages", "AI summary", "Up to 8 hours of file length", "Many formats supported: FLAC, MULAW, AMR, AMR_WB, MP3, MP4, MOV, M4A, AAC, WAV, OGG, OPUS, MPEG", "Stored and centralized data history", "Sharable results"],
      frequency: "Monthly",
      price: 19.99
   },
   {
      name: "Company",
      description: ["Transcribe in 125+ languages", "Everything in Pro, plus:", "3 additional team member", "Acces to plugins", "Priority support"],
      frequency: "Monthly",
      price: 49.99
   }
])

// na ko hoe sub record
// juste ijerevana anle table alo atreto
db.subscription
   .find({ auth0Id: "google-oauth2|109805505081631767458", status: "Cancel" })
   .sort({ purchaseDate: -1 })
   .limit(1);

db.createCollection("subscription")
db.subscription.insertMany([
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 9.99,
    status: "Paid",
    purchaseDate: ISODate("2023-01-10"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 9.99,
    status: "Paid",
    purchaseDate: ISODate("2023-02-10"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 9.99,
    status: "Paid",
    purchaseDate: ISODate("2023-03-10"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 9.99,
    status: "Cancelled",
    purchaseDate: ISODate("2023-04-10"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "YEARLY",
    price: 99.99,
    status: "Paid",
    purchaseDate: ISODate("2023-05-01"),
    invitationCode: "INVITE-2023",
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "YEARLY",
    price: 99.99,
    status: "Expired",
    purchaseDate: ISODate("2024-05-01"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },

  // 2024
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 12.99,
    status: "Paid",
    purchaseDate: ISODate("2024-01-15"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 12.99,
    status: "Paid",
    purchaseDate: ISODate("2024-02-15"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 12.99,
    status: "Failed",
    purchaseDate: ISODate("2024-03-15"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 12.99,
    status: "Paid",
    purchaseDate: ISODate("2024-04-15"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },

  // 2025
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "YEARLY",
    price: 119.99,
    status: "Paid",
    purchaseDate: ISODate("2025-01-01"),
    invitationCode: "NEWYEAR2025",
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 14.99,
    status: "Paid",
    purchaseDate: ISODate("2025-02-01"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  },
  {
    auth0Id: "google-oauth2|109805505081631767458",
    mail: "user@gmail.com",
    subscriptionType: "MONTHLY",
    price: 14.99,
    status: "Paid",
    purchaseDate: ISODate("2025-03-01"),
    invitationCode: null,
    subscriptionOwner: "SELF"
  }
]);
db.subscription.insertOne({
   auth0Id: "google-oauth2|109805505081631767458",
   mail: "user@gmail.com",
   subscriptionType: "Pro",
   price: 19.99,
   status: "Cancel",
   purchaseDate: ISODate("2026-01-11"),
   subscriptionOwner: "google-oauth2|109805505081631767458"
})
// default sub
db.subscription.insertOne({
   auth0Id: "dewofwejofiejwfoiewjfoewijfowejfioewjfioewjfiowejf8",
   mail: "cedrictiavina426@gmail.com",
   subscriptionType: "Company",
   status: "ACTIVE",
   invitationCode: "asxcvbeuwnufwuvftuirbtyrenoiewjtifwjftoi",
   purchaseDate: ISODate("2025-01-21"),
   price: 49.99,
   subscriptionOwner: "dewofwejofiejwfoiewjfoewijfowejfioewjfioewjfiowejf8"
})



db.createCollection("review")
// db.review.insertMany([
//    {
//       date: new Date(),
//       auth0Id: "auth0|6954292e5b43643b131feeee",
//       review: "",
//       name: "",
//       firstName: "",
//       stars: 4.5
//    }
// ])
const longComments = [
  "Très bonne expérience du début à la fin. Le service est fluide et facile à utiliser, et tout s’est déroulé comme prévu. Je recommande sans hésiter.",
  "Globalement satisfait de la prestation. Quelques petits détails pourraient être améliorés, mais dans l’ensemble le rapport qualité/prix est très correct.",
  "Service rapide et efficace. L’équipe a su répondre à mes questions rapidement et de manière professionnelle. Je referai appel à eux.",
  "Bonne expérience dans l’ensemble. La livraison a pris un peu plus de temps que prévu, mais le produit correspond parfaitement à la description.",
  "Très satisfait de mon achat. La qualité est au rendez-vous et l’utilisation est simple. Rien à redire pour le moment.",
  "L’expérience est correcte mais sans plus. Le service fonctionne, cependant je m’attendais à quelque chose d’un peu plus abouti.",
  "Je suis agréablement surpris par la qualité du service. Tout est clair, bien expliqué et facile à prendre en main. Bravo à l’équipe.",
  "Déçu par mon expérience. Plusieurs problèmes sont apparus dès le début et cela a impacté mon utilisation. Dommage car le concept est intéressant.",
  "Bon produit dans l’ensemble. Il remplit sa fonction, même si certaines améliorations seraient les bienvenues à l’avenir.",
  "Très mauvaise expérience. Le service ne répond pas à mes attentes et j’ai rencontré trop de difficultés. Je ne recommanderai pas.",
  "Produit conforme à la description. L’installation a été simple et rapide, et tout fonctionne correctement jusqu’à présent.",
  "Service sérieux et professionnel. Les échanges avec le support ont été clairs et efficaces. Je suis satisfait.",
  "Expérience mitigée. Certains aspects sont très réussis, mais d’autres mériteraient d’être retravaillés.",
  "Très bonne surprise. Je ne m’attendais pas à un service aussi qualitatif. Tout est bien pensé et intuitif.",
  "Plutôt satisfait dans l’ensemble. Le service fait le travail, même si quelques lenteurs ont été constatées.",
  "Je suis très content de cette expérience. La qualité est au rendez-vous et le suivi client est excellent.",
  "L’expérience utilisateur est agréable et bien conçue. Tout est clair et accessible, même pour un débutant.",
  "Délais respectés et produit conforme. Je n’ai rencontré aucun problème particulier lors de l’utilisation.",
  "Service correct mais perfectible. Certaines fonctionnalités pourraient être améliorées pour offrir une meilleure expérience.",
  "Très satisfait du service proposé. Je l’utilise régulièrement et je n’ai jamais rencontré de problème majeur."
];
for (let i = 0; i < 150; i++) {
  const reviewText = longComments[Math.floor(Math.random() * longComments.length)];

  let stars;
  if (
    reviewText.includes("Très mauvaise") ||
    reviewText.includes("Déçu") ||
    reviewText.includes("difficultés")
  ) {
    stars = Math.floor(Math.random() * 2) + 1; // 1–2
  } else if (
    reviewText.includes("mitigée") ||
    reviewText.includes("sans plus") ||
    reviewText.includes("correct")
  ) {
    stars = 3;
  } else {
    stars = Math.floor(Math.random() * 2) + 4; // 4–5
  }

  db.review.insertOne({
    creationDate: new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
    ),
    auth0Id: "auth0|6954292e5b43643b131feeee",
    review: reviewText,
    name: "Doe " + i,
    firstName: "John " + i,
    stars
  });
}


db.createCollection("transcription")
db.transcription.insertMany([
   {
      file: "",
      language: "fr",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Transcription complète du podcast sur l'intelligence artificielle et ses impacts sociétaux...",
      title: "L'IA et l'avenir du travail",
      subtitle: "Comment l'intelligence artificielle transforme les emplois",
      summary: "Ce podcast explore les opportunités et défis posés par l'IA dans le monde professionnel.",
      goal: "paragraph",
      length: "short",
      additionalInstruction: "Mettre l'accent sur les exemples concrets d'entreprises.",
      transcriptionType: "live",
      creationDate: new Date("2025-03-15")
   },
   {
      file: "conference_2025.mp4",
      language: "en",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Full transcript of the keynote speech about climate change and sustainable development...",
      title: "Climate Action Now",
      subtitle: "Urgent steps towards a sustainable future",
      summary: "A compelling call to action on global warming and renewable energies.",
      goal: "paragraph",
      length: "short",
      additionalInstruction: "Inclure les questions-réponses de l'audience.",
      transcriptionType: "batch",
      creationDate: new Date("2025-11-22")
   },
   {
      file: "",
      language: "fr",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Entretien avec le fondateur d'une startup innovante en santé numérique...",
      title: "Révolutionner la santé avec la tech",
      subtitle: "Entretien exclusif avec Dr. Marie Dupont",
      summary: "Discussion sur les applications mobiles pour le suivi médical personnel.",
      goal: "paragraph",
      length: "short",
      additionalInstruction: "Ajouter des notes sur les références scientifiques mentionnées.",
      transcriptionType: "live",
      creationDate: new Date("2025-09-08")
   },
   {
      file: "webinar_ia.mp3",
      language: "fr",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Transcription du webinar sur les bases de l'apprentissage automatique...",
      title: "Introduction à l'IA",
      subtitle: "Pour les débutants en machine learning",
      summary: "Un cours introductif couvrant les concepts fondamentaux de l'IA.",
      goal: "paragraph",
      length: "long",
      additionalInstruction: "Inclure des exemples de code simples.",
      transcriptionType: "batch",
      creationDate: new Date("2025-06-30")
   },
   {
      file: "",
      language: "fr",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Transcription du débat télévisé entre candidats aux élections...",
      title: "Débat présidentiel 2025",
      subtitle: "Économie, éducation et environnement",
      summary: "Échanges vifs sur les priorités nationales.",
      goal: "paragraph",
      length: "long",
      additionalInstruction: "Marquer les interruptions et applaudissements.",
      transcriptionType: "live",
      creationDate: new Date("2025-01-05")
   },
   {
      file: "podcast_cybersecurite.mp3",
      language: "fr",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Transcription complète du podcast sur les enjeux actuels de la cybersécurité...",
      title: "Cybersécurité et menaces modernes",
      subtitle: "Comprendre les attaques et s’en protéger",
      summary: "Analyse des principales cybermenaces et des bonnes pratiques pour les entreprises.",
      goal: "paragraph",
      length: "short",
      additionalInstruction: "Inclure des exemples récents de cyberattaques médiatisées.",
      transcriptionType: "batch",
      creationDate: new Date("2025-02-10")
   },
   {
      file: "",
      language: "en",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Interview transcript with a product manager about agile methodologies...",
      title: "Agile in Practice",
      subtitle: "Lessons from real-world product teams",
      summary: "Insights on how agile frameworks are applied in fast-growing tech companies.",
      goal: "paragraph",
      length: "short",
      additionalInstruction: "Highlight challenges and common mistakes.",
      transcriptionType: "live",
      creationDate: new Date("2025-04-18")
   },
   {
      file: "cours_finance.mp4",
      language: "fr",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Les fondamentaux de la finance reposent sur la compréhension des marchés, des risques et des investissements, qui forment un ensemble étroitement lié. Les marchés financiers sont des lieux — physiques ou électroniques — où s’échangent des actifs comme les actions, les obligations ou les devises, et ils jouent un rôle essentiel dans l’allocation du capital au sein de l’économie. Investir consiste à engager des ressources aujourd’hui dans l’espoir d’obtenir un rendement futur, mais toute décision d’investissement implique une prise de risque, c’est-à-dire l’incertitude quant aux résultats attendus. Ces risques peuvent être multiples : risque de marché, de crédit, de liquidité ou encore inflationniste. La finance cherche donc à analyser, mesurer et gérer ces risques afin d’optimiser le couple rendement/risque. La diversification, l’horizon de placement et l’information disponible sont des éléments clés pour prendre des décisions rationnelles et adaptées aux objectifs de chaque investisseur",
      title: "Fondamentaux de la finance",
      subtitle: "Marchés, risques et investissements",
      summary: "Les fondamentaux de la finance reposent sur le fonctionnement des marchés financiers, la prise de risque et les décisions d’investissement. Investir vise à obtenir un rendement futur, mais implique toujours une incertitude qu’il faut analyser et gérer. L’objectif principal est d’optimiser le rapport entre risque et rendement grâce à une bonne information et à la diversification.",
      goal: "paragraph",
      length: "long",
      additionalInstruction: "Ajouter des définitions claires pour les termes techniques.",
      transcriptionType: "batch",
      creationDate: new Date("2025-03-03")
   },
   {
      file: "",
      language: "fr",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Table ronde sur l’éducation numérique et les nouvelles pédagogies...",
      title: "L’école à l’ère du numérique",
      subtitle: "Quels changements pour les enseignants et les élèves ?",
      summary: "Discussion sur l’impact des outils numériques dans l’éducation.",
      goal: "paragraph",
      length: "short",
      additionalInstruction: "Identifier les prises de parole de chaque intervenant.",
      transcriptionType: "live",
      creationDate: new Date("2025-05-21")
   },
   {
      file: "startup_pitch_day.mp3",
      language: "en",
      auth0Id: "auth0|6954292e5b43643b131feeee",
      content: "Transcript of startup pitches presented to venture capital investors...",
      title: "Startup Pitch Day 2025",
      subtitle: "Innovations shaping tomorrow",
      summary: "A collection of pitches from early-stage startups across various sectors.",
      goal: "paragraph",
      length: "long",
      additionalInstruction: "Summarize each pitch in a separate subsection.",
      transcriptionType: "batch",
      creationDate: new Date("2025-07-14")
   }
])
const docs = [];

// date aléatoire entre 2022 et 2026
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// durée aléatoire en SECONDES (entre 30s et 2h)
function randomFileDuration() {
  return Math.floor(Math.random() * (2 * 60 * 60 - 30)) + 30;
}

for (let i = 1; i <= 50; i++) {
  docs.push({
    file: "",
    language: "fr",
    auth0Id: "auth0|6954292e5b43643b131feeee",
    content: `Transcription complète du podcast numéro ${i} sur l'intelligence artificielle et ses impacts sociétaux...`,
    title: `L'IA et l'avenir du travail ${i}`,
    subtitle: "Comment l'intelligence artificielle transforme les emplois",
    summary: "Ce podcast explore les opportunités et défis posés par l'IA dans le monde professionnel.",
    goal: "paragraph",
    length: "short",
    fileDuration: randomFileDuration(),
    additionalInstruction: "Mettre l'accent sur les exemples concrets d'entreprises.",
    transcriptionType: "live",
    creationDate: randomDate(
      new Date("2022-01-01"),
      new Date("2026-12-31")
    )
  });
}
db.transcription.insertMany(docs);
db.transcription.aggregate([
  {
    $match: {
      creationDate: {
        $gte: ISODate("2000-01-01"),
        $lte: ISODate("2050-12-31")
      }
    }
  },
  {
    $facet: {

      /* 1️⃣ Langage le plus utilisé */
      mostUsedLanguage: [
        { $group: { _id: "$language", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ],

      /* 2️⃣ Total secondes transcrites */
      totalDuration: [
        { $group: { _id: null, totalSeconds: { $sum: "$fileDuration" } } }
      ],

      /* 3️⃣ Nombre total de transcriptions */
      totalTranscriptions: [
        { $count: "count" }
      ],

      /* 4️⃣ Nombre de transcriptions par mois */
      transcriptionsPerMonth: [
        {
          $group: {
            _id: {
              year: { $year: "$creationDate" },
              month: { $month: "$creationDate" }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]
    }
  }
])




// any amin'ny back daoly no ilaina
db.createCollection("transcription_settings")
db.createCollection("type_transcription")
