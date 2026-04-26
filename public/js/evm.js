// EVM Simulator Logic

const candidates = [
    { id: 1, name: "Lotus Party", symbol: "🌸" },
    { id: 2, name: "Hand Party", symbol: "✋" },
    { id: 3, name: "Cycle Party", symbol: "🚲" },
    { id: 4, name: "Clock Party", symbol: "🕰️" },
    { id: 5, name: "NOTA", symbol: "🚫" }
];

let isVoting = false;
let audioContext = null;

function initEVM() {
    const container = document.getElementById('evm-candidates');
    if (!container) return;
    
    container.innerHTML = '';
    
    candidates.forEach((cand, index) => {
        const row = document.createElement('div');
        row.className = 'evm-candidate-row';
        row.innerHTML = `
            <div class="candidate-info">
                <span>${index + 1}.</span>
                <span style="font-size: 1.2rem;" aria-hidden="true">${cand.symbol}</span>
                <span>${cand.name}</span>
            </div>
            <div class="evm-controls">
                <div class="evm-led" id="led-${cand.id}"></div>
                <button class="evm-btn" data-id="${cand.id}" aria-label="Vote for ${cand.name}"></button>
            </div>
        `;
        container.appendChild(row);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.evm-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (isVoting) return;
            const candId = parseInt(e.target.getAttribute('data-id'));
            castVote(candId);
        });
    });

    document.getElementById('evm-reset-btn').addEventListener('click', resetEVM);
}

function playBeep() {
    // Initialize AudioContext on first user interaction
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // High pitch beep
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 3); // Beep lasts ~3 seconds for a real EVM sound effect
}

function castVote(candId) {
    isVoting = true;
    
    // Disable all buttons
    document.querySelectorAll('.evm-btn').forEach(btn => btn.classList.add('disabled'));

    // Turn on LED
    const led = document.getElementById(`led-${candId}`);
    if (led) led.classList.add('active');

    // Play Beep
    playBeep();

    // Trigger VVPAT Animation
    const cand = candidates.find(c => c.id === candId);
    triggerVVPAT(cand);
}

function triggerVVPAT(cand) {
    const slip = document.getElementById('vvpat-slip');
    const status = document.getElementById('vvpat-status');
    
    document.getElementById('slip-serial').textContent = cand.id;
    document.getElementById('slip-symbol').textContent = cand.symbol;
    document.getElementById('slip-name').textContent = cand.name;

    status.textContent = "Printing...";
    
    // Slide down
    slip.classList.add('show');
    
    // Wait 7 seconds
    let timeLeft = 7;
    const interval = setInterval(() => {
        timeLeft--;
        status.textContent = `Visible for ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            
            // Drop slip into sealed box
            slip.classList.remove('show');
            slip.classList.add('drop');
            status.textContent = "Vote Recorded ✓";
        }
    }, 1000);
}

function resetEVM() {
    isVoting = false;
    
    // Reset LEDs
    document.querySelectorAll('.evm-led').forEach(led => led.classList.remove('active'));
    
    // Enable buttons
    document.querySelectorAll('.evm-btn').forEach(btn => btn.classList.remove('disabled'));
    
    // Reset VVPAT
    const slip = document.getElementById('vvpat-slip');
    slip.classList.remove('show', 'drop');
    
    document.getElementById('vvpat-status').textContent = "Ready";
}

document.addEventListener('DOMContentLoaded', initEVM);
