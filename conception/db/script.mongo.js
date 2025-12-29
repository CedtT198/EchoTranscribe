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

// vita redis tampoka
// db.createCollection("otp")
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
db.createCollection("summary_type")
db.createCollection("type_transcription")
