const express = require('express')
const mongoose = require('mongoose')


const app = express()
const PORT = 3000

app.use(express.urlencoded({extended: true})) 


mongoose.connect('mongodb://localhost:27017/coincrud', {useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})

app.get('/coins/new', (req, res) => {
    res.render('new.ejs');
  })
  app.get('/coins', (req, res) => {
    res.render('index.ejs', {
    //   coins: coins
    })
  })

app.post('/coins', (req, res) => {
    console.log(req.body)
    // coins.push(req.body)
    res.send('received')
    // res.redirect('/coins')
  })

app.listen(PORT, () => {
    console.log ("Server is running on port " + PORT)
})