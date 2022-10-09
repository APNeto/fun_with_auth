import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

import express  from 'express'
const app = express()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false }))

let users = []

app.get('/', (req, res) => {
  res.render('index.ejs', { name: "Beto" })
})

app.get('/login', (req, res) => {
  res.render("login.ejs")
})

app.post('/login', (req, res) => {
})

app.get('/register', (req, res) => {
  res.render("register.ejs")
})

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
      return res.status(500).json({ error: err })
    }
    else {
      users.push({
        name: req.body.name,
        password: hash,
        email: req.body.email
      })
      return res.status(201).json({ message: "User created" })
    }
  })
})

// app.get("/users", (req, res) => {
//   res.send(users)
// })

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})