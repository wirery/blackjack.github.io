//Arrays created to hold values, ranks, decks and hands
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
//This loop creates sets the value of the ace and pushes into the deck
        if (RANK[j] === 'A') {
            DECK.push(new Card(SUITS[i], RANK[j], 1, 11))
            continue;
        }
//create the value of jacks and pushes into deck array
        DECK.push(new Card(SUITS[i], RANK[j], parseInt(RANK[j])))
    }
}


//Create a function to shuffle the cards (Reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)


function shuffle(array) {
//I found a shuffle function that was able to create a randomized deck.  It iterates over the index and rearranges them in a different order. 
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
    } checkWin()
}


//create an event listener to deal cards and check status of player total vs dealer total
document.getElementById('start').addEventListener('click', dealHand)



//create a function to deal a new card to the player
function dealHit() {
    let cardToDeal = DECK.pop()
    console.log(cardToDeal)
    playerHand.push(cardToDeal)
    checkWin()
}

//create an event listener to deal a new card to the player and check status of player total vs dealer total
document.getElementById('hitMe').addEventListener('click', dealHit)


//This function allows me to display the value of my cards on the playing cards.
function displayCardValue(card, location) {

    //create a div element to hold the player's card
    let playerCard = document.createElement('div')
    //places the card rank and suit label onto the player card
    playerCard.id = `playerCard${card.suit}${card.rank}`
    playerCard.innerText = `${card.suit} ${card.rank}`
    playerCard.classList.add("playingCard")
    document.getElementById(location).appendChild(playerCard)

}



//function to create a player hand total

function displayHandTotal(sum, location) {
    document.getElementById(location).innerText = sum
}

//create a function to check win and display hand values

function checkWin() {

    let playerHandValue = 0;
    let dealerHandValue = 0
    //accesses the element to push into
    document.getElementById('playerHand').innerHTML = '';
    //Create a loop over the player's hand
    for (let i = 0; i < playerHand.length; i++) {
        //set playerHandValue to the sum of the numbers in the player's array
        playerHandValue += playerHand[i].value
//calls the card value function and checks the player hand array.
        displayCardValue(playerHand[i], "playerHand")

    }
//calls the display hand total function, assigning the player's hand value to it.
    displayHandTotal(playerHandValue, "playerTotal")



    document.getElementById('dealerHand').innerHTML = '';

    for (let i = 0; i < dealerHand.length; i++) {
        //set playerHandValue to the sum of the numbers in the player's array
        dealerHandValue += dealerHand[i].value

        displayCardValue(dealerHand[i], "dealerHand")

    }

//calls the display hand total function, assigning the dealer's hand value to it.

    displayHandTotal(dealerHandValue, 'dealerTotal')

    // //Statement of player loses condition
    if (playerHandValue > 21 || (playerHandValue < dealerHandValue && dealerHandValue <= 21)) {
        alert("The player loses")
    }
//statement of player wins condition
    else if ((dealerHandValue > 21 || playerHandValue > dealerHandValue) && (dealerHandValue <= 21)) {
        alert("The player wins")
    }
//statement of tie/push condition
    else if (dealerHandValue == playerHandValue) {
        alert("push/tie")
    }
}

checkWin()

//ends the game once the player stays
function endGame () {
    alert("game over!")
}
document.getElementById('stay').addEventListener('click', endGame)
