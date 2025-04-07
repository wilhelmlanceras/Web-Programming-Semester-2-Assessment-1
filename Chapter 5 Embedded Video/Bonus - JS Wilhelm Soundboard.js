const audioSamples = [ // List of sounds
    { name: "Emotional Damage", file: "sounds/emotional damage meme.mp3" },
    { name: "Bad To The Bone", file: "sounds/bad to the bone meme.mp3" },
    { name: "Universal", file: "sounds/universal meme.mp3" },
    { name: "Which Bomboclat", file: "sounds/which bomboclat meme.mp3" },
    { name: "Pinoy Oh No Krinds", file: "sounds/pinoy oh no krinds meme.mp3" },
    { name: "Rick Rolled", file: "sounds/rick rolled meme.mp3" },
];

let currentPage = 0;
const samplesPerPage = 9;

const audioGrid = document.getElementById("audio-grid");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const textToSpeechInput = document.getElementById("text-to-speech-input");
const speakButton = document.getElementById("speak-button");

let currentAudio = null;  // Track the currently playing audio

function loadSamples() {
    audioGrid.innerHTML = "";
    const startIndex = currentPage * samplesPerPage;
    const endIndex = startIndex + samplesPerPage;
    const currentPageSamples = audioSamples.slice(startIndex, endIndex);

    currentPageSamples.forEach((sample) => {
        const sampleButton = document.createElement("button");
        sampleButton.classList.add("audio-sample");
        sampleButton.textContent = sample.name;

        const audio = new Audio(sample.file);

        sampleButton.addEventListener("click", () => {
            if (currentAudio) {
                // Stop the currently playing audio if there's one
                currentAudio.pause();
                currentAudio.currentTime = 0; // Reset the audio position to the start
            }
            // Play the new audio sample
            audio.play();
            currentAudio = audio; // Set the new audio as the current audio
        });

        audioGrid.appendChild(sampleButton);
    });

    prevButton.style.display = currentPage === 0 ? "none" : "inline-block";
    nextButton.style.display = endIndex >= audioSamples.length ? "none" : "inline-block";
}

function handleTextToSpeech() {
    const text = textToSpeechInput.value;
    if (text) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }
}

prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        loadSamples();
    }
});

nextButton.addEventListener("click", () => {
    if ((currentPage + 1) * samplesPerPage < audioSamples.length) {
        currentPage++;
        loadSamples();
    }
});

speakButton.addEventListener("click", handleTextToSpeech);

loadSamples();