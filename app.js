const SUITS = ['S', 'H', 'D', 'C']
const RANK = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', "Q", "K"]
const DECK = []
const playerHand = []
const dealerHand = []

class Card {
    constructor(suit, rank, value, altValue = 0) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
        this.altValue = altValue;
    }
}

//Create a loop from the suits and values arrays in order to create the deck of cards.

for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < RANK.length; j++) {
        // DECK.push(SUITS[i] + VALUES[j])
        if (RANK[j] === 'J' || RANK[j] === 'K' || RANK[j] === 'Q') {
            DECK.push(new Card(SUITS[i], RANK[j], 10))
            continue;
        }

        if (RANK[j] === 'A') {
            DECK.push(new Card(SUITS[i], RANK[j], 1, 11))
            continue;
        }

        DECK.push(new Card(SUITS[i], RANK[j], parseInt(RANK[j])))
    }
}
console.log(DECK)


//Create a function to shuffle the cards (Reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)


function shuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random
            () * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }
    return array;

};
shuffle(DECK)
console.log(DECK)

//create a function to deal cards console.log(deck.pop), append it to a div
function dealHand() {
    if (playerHand.length == 0 && dealerHand.length == 0) {
        for (let i = 1; i <= 4; i++) {
            let cardToDeal = DECK.pop();
            console.log(cardToDeal)
            if (i % 2 == 0) {
                playerHand.push(cardToDeal)
                continue
            }
            dealerHand.push(cardToDeal)

        }
    }
}
dealHand()

console.log(dealerHand)
console.log(playerHand)
//create a function to connect cards to a div element

//create a function to hit
function dealHit() {
    let cardToDeal = DECK.pop()
    console.log(cardToDeal)
    playerHand.push(cardToDeal)
    checkWin()
}
document.getElementById('hitMe').addEventListener('click', dealHit)

//create a function to check win

function checkWin() {
    let playerHandValue = 0;
    let dealerHandValue = 0

    //Create a loop over the player's hand
    for (let i = 0; i < playerHand.length; i++) {
        //set playerHandValue to the sum of the numbers in the player's array
        playerHandValue += playerHand[i].value
        console.log(playerHandValue)
    } for (let i = 0; i < dealerHand.length; i++) {
        //set playerHandValue to the sum of the numbers in the player's array
        dealerHandValue += dealerHand[i].value
        console.log(dealerHandValue)
    }

    // //Statement of if playerHandValue is > 21, then player loses
    if (playerHandValue > 21 || (playerHandValue < dealerHandValue && dealerHandValue <= 21)) {
        console.log("The player loses")
    }

    // // } // statement of if the playerHandValue is < dealerHandValue && dealerHandValue is <= 21 
    // else if () {
    //     console.log("The player loses")

    // } //If the dealerHandValue is > 21, && playerHandValue <= 21
    else if ((dealerHandValue > 21 || playerHandValue > dealerHandValue) && (dealerHandValue <= 21)) {
        console.log("The player wins")
    }

    // // }//If the dealerHandValue is < 21 && playerHandValue is > dealerHandValue && playerHandValue is <=21, player wins
    // else if () {
    //             console.log("the player wins")
    // } //if the dealerHandValue === playerHandValue, tie/push
    else if (dealerHandValue == playerHandValue) {
        console.log("push/tie")
    }
}

checkWin()

// function end()
// {
//     var winner = -1;
//     var score = 0;
//     for(var i = 0; i < playerHand.length; i++)
//     {
//         if (playerHand[i].Points > score && players[i].Points < 22)
//         {
//             winner = i;
//         }
//         score = players[i].Points;
//     }
//     document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
// 