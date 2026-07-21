const socket = io();

const number = document.getElementById("number");
const counter = document.getElementById("counter");
const clock = document.getElementById("clock");
const bell = new Audio("audio/ding.mp3");
function queueNumberToSpeech(nomor) {

    // Contoh:
    // A024 -> "A nol dua empat"

    const prefix = nomor.charAt(0);

    const digits = nomor.substring(1);

    const angka = {
        "0": "nol",
        "1": "satu",
        "2": "dua",
        "3": "tiga",
        "4": "empat",
        "5": "lima",
        "6": "enam",
        "7": "tujuh",
        "8": "delapan",
        "9": "sembilan"
    };

    const hasil = digits
        .split("")
        .map(d => angka[d])
        .join(" ");

    return `${prefix} ${hasil}`;
}
function speakQueue(queue){

    const synth = window.speechSynthesis;

    synth.cancel();

    const nomor = queueNumberToSpeech(queue.nomor);

    const text =
        `Nomor antrean ${nomor}, silakan menuju Counter ${queue.counter}.`;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "id-ID";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    synth.speak(utterance);

}
// Jam Digital
function updateClock(){

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString("id-ID");

}

setInterval(updateClock,1000);

updateClock();

// Socket.IO
socket.on("queue-called", (queue) => {

    number.style.transform = "scale(1.3)";

    number.textContent = queue.nomor;

    counter.textContent = "Counter " + queue.counter;

    bell.play();

    number.classList.add("speaking");

    setTimeout(() => {

        announceQueue(queue, () => {

            number.classList.remove("speaking");

        });

    }, 700);

    setTimeout(() => {

        number.style.transform = "scale(1)";

    }, 250);

});