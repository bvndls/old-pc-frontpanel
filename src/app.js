// define elements
const pwrbtn = document.getElementById('power-circle');
const pwrled = document.getElementById('power-led');
const rstbtn = document.getElementById('reset-circle');
const trbbtn = document.getElementById('turbo-circle');
const trbled = document.getElementById('turbo-led');
const hddled = document.getElementById('hdisk-led');
let timeoutId;

// Toggle LED classes
function toggleLed(led, fromClass, toClass) {
    led.classList.replace(fromClass, toClass);
}

// Power button click listener and led logic
pwrbtn.addEventListener('click', () => {
    const isPoweredOn = pwrled.classList.contains('bg-green-600');
    toggleLed(pwrled, 'bg-green-' + (isPoweredOn ? '600' : '400'), 'bg-green-' + (isPoweredOn ? '400' : '600'));
    toggleLed(hddled, 'bg-red-' + (isPoweredOn ? '600' : '400'), 'bg-red-' + (isPoweredOn ? '400' : '600'));
    toggleLed(trbled, 'bg-yellow-400', 'bg-yellow-600', !isPoweredOn);
    if (isPoweredOn) {
        blink();
    } else {
        clearTimeout(timeoutId);
    }
});

// Turbo button click listener and led logic
trbbtn.addEventListener('click', () => {
    if (pwrled.classList.contains('bg-green-400')) {
        const isTurboOn = trbled.classList.contains('bg-yellow-600');
        toggleLed(trbled, 'bg-yellow-' + (isTurboOn ? '600' : '400'), 'bg-yellow-' + (isTurboOn ? '400' : '600'));
    }
});

// Reset button click listener and led logic
rstbtn.addEventListener('click', () => {
    if (pwrled.classList.contains('bg-green-400')) {
        clearTimeout(timeoutId);
        toggleLed(pwrled, 'bg-green-400', 'bg-green-600');
        toggleLed(trbled, 'bg-yellow-400', 'bg-yellow-600');
        setTimeout(() => {
            toggleLed(pwrled, 'bg-green-600', 'bg-green-400');
            toggleLed(hddled, 'bg-red-400', 'bg-red-600');
            blink();
        }, 1500);
    }
});

// LED blink function
function blink() {
    const isHddLedOn = hddled.classList.contains('bg-red-600');
    toggleLed(hddled, 'bg-red-' + (isHddLedOn ? '600' : '400'), 'bg-red-' + (isHddLedOn ? '400' : '600'));
    timeoutId = setTimeout(blink, Math.random() * 1000);
}