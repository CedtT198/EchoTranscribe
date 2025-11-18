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
      creation_date: new Date()
   },
   {
      name: "bera",
      mail: "bera@gmail.com",
      password: "bera",
      role: "Sub Admin",
      creation_date: new Date()
   },
   {
      name: "nom client1",
      first_name: "prenom client1",
      birthday: ISODate("2001-01-01T00:00:00Z"),
      mail: "client1@gmail.com",
      password: "client1",
      role: "Client",
      creation_date: new Date()
   }
])

// vita redis tampoka
// db.createCollection("otp")
db.createCollection("subscription")
db.subscription.insertMany([
   {
      name: "Free plan",
      description: "",
      price: 0
   },
   {
      name: "Independant",
      description: "",
      frequency: "Monthly",
      price: 9.99
   },
   {
      name: "Company",
      description: "",
      frequency: "Monthly",
      price: 29.99
   }
])

// na ko hoe sub record
// juste ijerevana anle table alo atreto
db.createCollection("subscriber")
db.subscriber.insertMany([
   {
      start_date: new Date(),
      end_date: new Date(),
      subscription_name: "Company",
      total: 9.99,
      payment_method: "Paypal",
      invitation_code: "q2w34e5rft6ghujd7wqe5f",
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
      transcribing_type:"batch",
      summary_type:"Standard",
      user: "client1@gmail.com"
   },
   {
      title: "Live conversation between alice and bob",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quisquam quam at? Dolorem illum praesentium molestiae sint esse, quasi, aut rerum est ullam sunt, veniam nobis nisi fuga! Accusantium, ex?",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quisquam quam at? Dolorem illum praesentium molestiae sint esse, quasi, aut rerum est ullam sunt, veniam nobis nisi fuga! Accusantium, ex?",
      date: new Date(),
      transcribing_type:"live",
      summary_type:"decisional",
      user: "client1@gmail.com"
   }
])

// any amin'ny back daoly no ilaina
db.createCollection("summary_type")
db.createCollection("subscription_type")
db.createCollection("type_transcription")
