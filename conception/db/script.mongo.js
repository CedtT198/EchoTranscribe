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
      name: "cedric",
      password: "cedric",
      role: "Super Administrator"
   },
   {
      name: "njiva",
      mail: "njiva@gmail.com",
      password: "njiva",
      role: "Administrator",
      creationDate: new Date()
   },
   {
      name: "bera",
      mail: "bera@gmail.com",
      password: "bera",
      role: "Sub Admin",
      creationDate: new Date()
   },
   {
      name: "nom client1",
      firstName: "prenom client1",
      birthday: ISODate("2001-01-01T00:00:00Z"),
      mail: "client1@gmail.com",
      password: "client1",
      role: "Client",
      creationDate: new Date()
   }
])

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
db.createCollection("subscription")
db.subscription.insertMany([
   {
      startDate: new Date(),
      endDate: new Date(),
      subscriptionName: "Company",
      total: 9.99,
      paymentMethod: "Paypal",
      invitationCode: "q2w34e5rft6ghujd7wqe5f",
      master: "client1@gmail.com"
   }
])


db.createCollection("review")
db.review.insertMany([
   {
      date: new Date(),
      auth0Id: "auth0|6954292e5b43643b131feeee",
      review: "",
      name: "",
      firstName: "",
      stars: 4.5
   }
])
for (let i = 0; i < 1000; i++) {
  db.review.insertOne({
    date: new Date(),
    auth0Id: "auth0|6954292e5b43643b131feeee",
    review: "Review automatique " + i,
    name: "name "+i,
    firstName: "first name "+i,
    stars: (Math.floor(Math.random() * 5) + 1)
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
      content: "Transcription du cours universitaire sur les marchés financiers...",
      title: "Fondamentaux de la finance",
      subtitle: "Marchés, risques et investissements",
      summary: "Présentation des principes clés de la finance moderne.",
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

// any amin'ny back daoly no ilaina
db.createCollection("transcription_settings")
db.createCollection("type_transcription")
