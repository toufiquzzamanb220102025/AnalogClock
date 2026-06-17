const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const smoothToggle = document.getElementById("smoothToggle");

let smoothMode = true;

smoothToggle.addEventListener("change", () => {
    smoothMode = smoothToggle.checked;

    if (!smoothMode) {
        cancelAnimationFrame(animationId);
        updateTickClock();
        tickInterval = setInterval(updateTickClock, 1000);
    } else {
        clearInterval(tickInterval);
        animateClock();
    }
});

function setHandRotation(hourDeg, minuteDeg, secondDeg) {
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

function updateTickClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const hourDeg = ((hours % 12) + minutes / 60) * 30;

    setHandRotation(hourDeg, minuteDeg, secondDeg);
}

let animationId;
let tickInterval;

function animateClock() {
    const now = new Date();

    const seconds =
        now.getSeconds() +
        now.getMilliseconds() / 1000;

    const minutes =
        now.getMinutes() +
        seconds / 60;

    const hours =
        (now.getHours() % 12) +
        minutes / 60;

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6;
    const hourDeg = hours * 30;

    setHandRotation(hourDeg, minuteDeg, secondDeg);

    animationId = requestAnimationFrame(animateClock);
}

animateClock();
