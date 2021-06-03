const express = require('express')
const mongoose = require('mongoose')


const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})




const Coin = require('./models/coins.js')


app.get('/coins', (req, res) => {
    // console.log(res.data)
    Coin.find({}, (error, allCoins) => {
        if (error) {
            console.log(error)
        } else {
            res.render('index.ejs', {
                Coin: allCoins
            })
        }
    })
})

app.get('/coins/new', (req, res) => {
    res.render('new.ejs');
})

app.get('/coins/:id', (req, res) => {
    console.log(req.params.id)
    Coin.findById(req.params.id, (error, foundCoin)=> {
        // res.send(foundCoin)
        res.render('show.ejs', {
            Coin: foundCoin
        })
    })
})

app.post('/coins', (req, res) => {
    console.log(req.body)
    // Coin.push(req.body)
    Coin.create(req.body, (error, createdCoin) => {
        // res.redirect(createdCoin)
    })
    // res.send('received')
    res.redirect('/coins')
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})