const coin = document.getElementById('coin');
const flipButton = document.getElementById('flip-button');
const resultText = document.getElementById('result');

// Disable the button during animation
let canFlip = true;

// Tab switching function
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    const tabToDisplay = document.getElementById(tabName);
    if (tabToDisplay) {
        tabToDisplay.style.display = "flex";
    }
    if (evt && evt.currentTarget) {
       evt.currentTarget.className += " active";
    }
}

// Initialize the first tab (Coin Flip) to be visible
if (document.getElementById('coin-flip')) {
    document.getElementById('coin-flip').style.display = "flex";
}

// Coin Flip Logic (if elements exist)
if (flipButton) {
    flipButton.addEventListener('click', () => {
        if (!canFlip) return;
        canFlip = false;
        flipButton.disabled = true;
        resultText.textContent = 'Flipping...';
        const result = Math.random() < 0.5;
        if (coin) coin.classList.add('flipping');
        setTimeout(() => {
            if (coin) coin.classList.remove('flipping');
            resultText.textContent = result ? 'Heads!' : 'Tails!';
            canFlip = true;
            flipButton.disabled = false;
            if (coin) coin.style.transform = `rotateY(${result ? '0' : '180deg'})`;
        }, 1000);
    });
}

// Dice Roll Logic
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('roll-button');
const diceResultText = document.getElementById('dice-result');
let canRoll = true;

if (rollButton) {
    rollButton.addEventListener('click', () => {
        if (!canRoll) return;
        canRoll = false;
        rollButton.disabled = true;
        if (diceResultText) diceResultText.textContent = 'Rolling...';

        let rollCount = 0;
        const rollInterval = setInterval(() => {
            if(dice1) dice1.textContent = Math.floor(Math.random() * 6) + 1;
            if(dice2) dice2.textContent = Math.floor(Math.random() * 6) + 1;
            rollCount++;
            if (rollCount >= 10) {
                clearInterval(rollInterval);
                const finalResult1 = Math.floor(Math.random() * 6) + 1;
                const finalResult2 = Math.floor(Math.random() * 6) + 1;
                if(dice1) dice1.textContent = finalResult1;
                if(dice2) dice2.textContent = finalResult2;
                if (diceResultText) diceResultText.textContent = `You rolled a ${finalResult1} and a ${finalResult2}! Total: ${finalResult1 + finalResult2}`;
                canRoll = true;
                rollButton.disabled = false;
            }
        }, 100);
    });
}

// Random Word Picker Logic
const wordListInput = document.getElementById('word-list-input');
const pickWordButton = document.getElementById('pick-word-button');
const pickedWordResult = document.getElementById('picked-word-result');
const resetListButton = document.getElementById('reset-list-button'); // Re-using ID, was reset-wheel-button

if (pickWordButton) {
    pickWordButton.addEventListener('click', () => {
        if (!wordListInput || !pickedWordResult) return;
        const words = wordListInput.value.split('\n').map(word => word.trim()).filter(word => word !== '');
        
        if (words.length === 0) {
            pickedWordResult.textContent = 'Please enter some words first!';
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * words.length);
        pickedWordResult.textContent = words[randomIndex];
    });
}

if (resetListButton) {
    resetListButton.addEventListener('click', () => {
        if (wordListInput) wordListInput.value = '';
        if (pickedWordResult) pickedWordResult.textContent = '---';
    });
}

// Initial setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const activeTab = document.querySelector('.tab-link.active');
    if (activeTab) {
        const activeTabContentId = activeTab.getAttribute('onclick').match(/'([^']+)'/)[1];
        const el = document.getElementById(activeTabContentId);
        if (el) {
             el.style.display = "flex";
        }
    }
}); 