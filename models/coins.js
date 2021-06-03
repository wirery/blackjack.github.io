const mongoose = require('mongoose')

const coinsSchema = new mongoose.Schema({
    country: { type: String, required: true},
    // img:  { type: String, required: true},
    // denomination:  { type: String, required: true},
    // quantity:  { type: String, required: true},
    // year:  { type: String, required: true},
    // dateOfPurchase:  { type: String, required: true},
    // dateSold:  { type: String, required: true},
    // salePrice:  { type: String, required: true}
    
})

const Coins = mongoose.model('Coins', coinsSchema)

module.exports = Coins