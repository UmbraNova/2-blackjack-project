// variables
let cards = []
let sum = 0
let isAlive = true
let message = ""

// HTML elements
let startBtn = document.getElementById("start-btn")
let mainBtnContainer = document.getElementById("main-btn-container")
let messageEl = document.getElementById("message-el")
let cardContainerEl = document.getElementById("card-container")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let confettiContainer = document.getElementById("confetti-container")


function startGame() {
    drawCard() 
    drawCard()
    checkForWin()
    showDrawAndEndBtn()
    renderCards()
}

function checkForWin() {
    if (sum <= 20) {
        message = "Do you want to draw a new card? 🙂"
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳"
        new Audio('audio/payout-award.wav').play()
        winAnimation()
        showRestartGameBtn()
    } else {
        message = "You're out of the game! 😭"
        new Audio('audio/game-over.wav').play()
        showRestartGameBtn()
    }
    messageEl.textContent = message
}

function showRestartGameBtn() {
    new Audio('audio/arrow-whoosh.wav').play()
    setTimeout(() => {
        isAlive = false
        mainBtnContainer.innerHTML = `
        <button id="restart-btn" onclick="restartGame()">TRY AGAIN?</button>`
    }, 150)    
}

function restartGame() {
    new Audio('audio/level-increased.wav').play()
    setTimeout(() => {
        cards = []
        sum = 0
        message = "Want to play a round?"
        cardsEl.textContent = ""
        startGame()
        isAlive = true
        mainBtnContainer.innerHTML = `
        <button id="start-btn" onclick="startGame()">START GAME</button>`
    }, 500)
}

function drawCard() {
    if (isAlive) {
        const newCard = randomCard()
        cards.push(newCard)
        sum += newCard
        
        let showCardsNumbers = "Cards: "
        for (let card of cards) {
            showCardsNumbers += `${card} - `
        }
        cardsEl.textContent = showCardsNumbers
        renderCards()
        checkForWin()    
    }
}

function renderCards() {
    let renderedCards = ""
    for (let card of cards) {
        renderedCards += `
        <div class="card">
            <div class="card-container-top">
                <p class="card-number-top">${card}</p>
                <div class="diamond"></div>
            </div>
            
            <div class="diamond"></div>
            
            <div class="card-container-bottom">
                <div class="diamond"></div>
                <p class="card-number-bottom">${card}</p>
            </div>
        </div>`
    }
    cardContainerEl.innerHTML = renderedCards
    sumEl.textContent = "Sum: " + sum
}

function randomCard() {
    new Audio('audio/game-notification.wav').play()
    return Math.floor(Math.random(10) * 10) + 1
}
function showDrawAndEndBtn() {
    mainBtnContainer.innerHTML = `
    <button id="draw-btn" onclick="drawCard()">DRAW CARD</button>
    <button id="end-btn" onclick="showRestartGameBtn()">END GAME</button>`
}

// animation section =====================================

function winAnimation() {
    // TODO: add cards animation
    
    let styleString = ""
    let allStyleStrings = ""
    confettiContainer.classList.add("confetti-animation")
    
    let stringOfDivs = ""
    for (let i = 0; i < 100; i++) {
        let randomWord = randomWordsGenerator()
        let randomNumber = Math.floor(Math.random(10) * 10)
        styleString = `
        .${randomWord} {
            background-color: ${randomColor()};
            animation: 4s ease-in confetti-${randomNumber};
        }
        @keyframes confetti-${randomNumber} {
            0% {top: ${rndNumberBig()}px}
            100% {top: ${rndNumberBig()}px}
        }`
        stringOfDivs += `<div class="${randomWord}"></div>`
        allStyleStrings += styleString
    }
    
    const styleCSS = document.createElement('style')
    styleCSS.innerHTML = allStyleStrings
    document.head.appendChild(styleCSS)
    
    confettiContainer.innerHTML = stringOfDivs
    
    setTimeout(() => {
        confettiContainer.classList.remove("confetti-animation")
        confettiContainer.innerHTML = ""
    }, 4000)
}

function rndNumberBig() {
    return Math.floor(Math.random(10) * 400)
}

let letters = []
function randomWordsGenerator() {
    let word =""
    letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    for (let i = 0; i < 8; i++) {
        word += letters[Math.floor(Math.random()*letters.length)]
    }
    return word
}

function randomColor() {
    const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "black", "white", "gray", "cyan", "magenta", "teal", "lime", "indigo", "violet", "turquoise", "gold", "silver"]
    return colors[Math.floor(Math.random()*letters.length)]
}