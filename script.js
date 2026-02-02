const textBox = document.getElementById('text-box');
const btnContainer = document.getElementById('btn-container');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const cursor = document.getElementById('cursor');

let i = 0;
let messageContent = "";

async function loadMessage() {
    try {
        const response = await fetch('letter.txt');
        messageContent = await response.text();
        typeWriter();
    } catch (error) {
        textBox.innerHTML = "My love, I couldn't load my message, but I love you! ❤️";
    }
}

function typeWriter() {
    if (i < messageContent.length) {
        textBox.innerHTML += messageContent.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
    } else {
        cursor.style.display = 'none';
        btnContainer.style.display = 'flex';
    }
}

function moveButton() {
    // The "No" button now teleports anywhere within the window
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed'; // Makes it fly anywhere on screen
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

yesBtn.addEventListener('click', () => {
    textBox.style.display = 'none';
    btnContainer.style.display = 'none';
    document.getElementById('celebration').style.display = 'block';
    createHearts(); // Optional bonus
});

// Inside your yesBtn click listener:
yesBtn.addEventListener('click', () => {
    // 1. Hide the letter and buttons
    textBox.style.display = 'none';
    btnContainer.style.display = 'none';
    
    // 2. Show the celebration (message + GIF)
    document.getElementById('celebration').style.display = 'block';
    
    // 3. Trigger the heart explosion
    createHearts(); 
    
    // 4. PLAY THE MUSIC 🎶
    const audio = document.getElementById('love-audio');
    audio.play().catch(error => {
        console.log("Audio couldn't play automatically:", error);
    });
});

// Bonus: Tiny heart explosion when she clicks Yes
function createHearts() {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(heart);
    }
}

loadMessage();

// ... keep your loadMessage and typeWriter functions ...

function createHearts() {
    const heartContainer = document.body;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.className = 'floating-heart';
            
            // Random horizontal position
            heart.style.left = Math.random() * 100 + 'vw';
            
            // Random size for variety
            const size = Math.random() * 1.5 + 1;
            heart.style.fontSize = `${size}rem`;
            
            // Random animation speed
            const duration = Math.random() * 3 + 2;
            heart.style.setProperty('--duration', `${duration}s`);
            
            heartContainer.appendChild(heart);

            // Clean up the heart after animation finishes
            setTimeout(() => heart.remove(), duration * 1000);
        }, i * 150); // Delay each heart so they don't all pop at once
    }
}

function moveButton() {
    // We use 'fixed' or calculate relative to the paper
    const paper = document.getElementById('paper');
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = 'none'; // Remove the initial centering
}

// Add these to your existing event listeners
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

yesBtn.addEventListener('click', () => {
    document.getElementById('text-box').style.display = 'none';
    document.getElementById('btn-container').style.display = 'none';
    document.getElementById('celebration').style.display = 'block';
    createHearts(); // This triggers the explosion!
});

