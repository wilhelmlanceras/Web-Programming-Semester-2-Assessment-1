// Variables for game state
let targetColor;
let colorOptions;
let lives = 5;
let score = 0;

// Start a new game
function startNewGame() {
    // Reset game state
    lives = 5;
    score = 0;
    document.getElementById("lives-count").textContent = lives;
    document.getElementById("final-score").textContent = '';
    document.getElementById("game-feedback").textContent = '';
    document.getElementById("restart-btn").style.display = 'none';
    startRound();
}

// Start a new round
function startRound() {
    // Generate random RGB values for target color
    targetColor = generateRandomColor();
    
    // Display target RGB value to guess
    document.getElementById("rgb-value").textContent = `RGB(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`;

    // Generate color options
    colorOptions = generateColorOptions(targetColor);

    // Display color options
    displayColorOptions();
}

// Generate random RGB color
function generateRandomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

// Generate three color options
function generateColorOptions(correctColor) {
    const options = [correctColor];
    while (options.length < 3) {
        const randomColor = generateRandomColor();
        if (!options.some(color => isEqual(color, randomColor))) {
            options.push(randomColor);
        }
    }
    return shuffleArray(options);
}

// Shuffle array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Check if two colors are equal
function isEqual(color1, color2) {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
}

// Display color options
function displayColorOptions() {
    const colorOptionsContainer = document.getElementById("color-options");
    colorOptionsContainer.innerHTML = '';
    colorOptions.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color-option');
        colorDiv.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        colorDiv.onclick = () => checkAnswer(color);
        colorOptionsContainer.appendChild(colorDiv);
    });
}

// Check if the selected color is correct
function checkAnswer(selectedColor) {
    if (isEqual(selectedColor, targetColor)) {
        document.getElementById("game-feedback").textContent = "Correct!";
        score++;
    } else {
        document.getElementById("game-feedback").textContent = "Incorrect!";
        lives--;
        document.getElementById("lives-count").textContent = lives;
    }
    
    if (lives === 0) {
        endGame();
    } else {
        startRound();
    }
}

// End the game also display the final score
function endGame() {
    document.getElementById("final-score").textContent = `Game Over! Your Score: ${score}`;
    document.getElementById("restart-btn").style.display = 'block';
}

// Start first game round
startNewGame();