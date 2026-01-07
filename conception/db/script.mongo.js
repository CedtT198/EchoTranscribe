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
      description: ["Transcribe in 125+ languages", "AI summary", "Many formats supported: FLAC, MULAW, AMR, AMR_WB, MP3, MP4, MOV, M4A, AAC, WAV, OGG, OPUS, MPEG", "Stored and centralized data history", "Sharable results"],
      frequency: "Monthly",
      price: 19.99
   },
   {
      name: "Company",
      description: ["Transcribe in 125+ languages", "Everything in Pro, plus:", "3 additional team member", "API access", "Priority support"],
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
      comment: "",
      stars: 4.5,
      user: "client1@gmail.com"
   }
])

db.createCollection("transcribing")
db.transcribing.insertMany([
   {
      title: "Meeting with the dev team",
      subtitle: "Subtitle",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quisquam quam at? Dolorem illum praesentium molestiae sint esse, quasi, aut rerum est ullam sunt, veniam nobis nisi fuga! Accusantium, ex?",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quisquam quam at? Dolorem illum praesentium molestiae sint esse, quasi, aut rerum est ullam sunt, veniam nobis nisi fuga! Accusantium, ex?",
      date: new Date(),
      file: "file.mp4",
      transcribingType:"batch",
      summaryType:"Standard",
      user: "client1@gmail.com"
   },
   {
      title: "Live conversation between alice and bob",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quisquam quam at? Dolorem illum praesentium molestiae sint esse, quasi, aut rerum est ullam sunt, veniam nobis nisi fuga! Accusantium, ex?",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quisquam quam at? Dolorem illum praesentium molestiae sint esse, quasi, aut rerum est ullam sunt, veniam nobis nisi fuga! Accusantium, ex?",
      date: new Date(),
      transcribingType:"live",
      summaryType:"decisional",
      user: "client1@gmail.com"
   }
])

// any amin'ny back daoly no ilaina
db.createCollection("transcription_settings")
db.createCollection("type_transcription")
