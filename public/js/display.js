const socket = io();

let playlist = [];

let currentIndex = 0;

const promoVideo = document.getElementById("promoVideo");
console.log("VIDEO:", promoVideo);
const promoImage = document.getElementById("promoImage");

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

utterance.onstart = () => {
    console.log("🎤 Mulai mengumumkan:", queue.nomor);
};

utterance.onend = () => {
    console.log("✅ Selesai mengumumkan:", queue.nomor);

    setIdleMode();
};

utterance.onerror = (e) => {
    console.error("❌ Gagal mengumumkan:", queue.nomor, e);
};

    synth.speak(utterance);

}

async function loadTimeline() {

    const res = await fetch("/api/display/timeline");

    const data = await res.json();

    const activity = data.activity || [];

    const waiting = data.waiting || [];

    const box = document.getElementById("timeline");

    box.innerHTML = "";

    // =====================
    // Activity dulu
    // =====================

    activity.forEach(item => {

        let icon = "📌";

        switch (item.type) {

            case "calling":
                icon = "🔊";
                break;

            case "finish":
                icon = "✔";
                break;

            case "recall":
                icon = "🔄";
                break;

            case "skip":
                icon = "⏭";
                break;

            case "ticket":
                icon = "🎫";
                break;

        }

        box.innerHTML += `
            <div class="timeline-item activity ${item.type}">
                ${icon} ${item.nomor}
            </div>
        `;

    });

    // =====================
    // Waiting Queue
    // =====================

    waiting.forEach(item => {

        box.innerHTML += `
            <div class="timeline-item waiting">
                ⏳ ${item.nomor}
            </div>
        `;

    });

}

function setQueueMode(){

    const wrapper=document.getElementById("displayWrapper");

    wrapper.classList.remove("idle-mode");

    wrapper.classList.add("queue-mode");

}

function setIdleMode(){

    const wrapper=document.getElementById("displayWrapper");

    wrapper.classList.remove("queue-mode");

    wrapper.classList.add("idle-mode");

}

async function loadPlaylist(){

    const res =
    await fetch("/api/media/playlist");

    playlist =
    await res.json();

    console.log("Playlist:",playlist);

    if(playlist.length){

        playCurrent();

    }

}

function nextMedia(){

    currentIndex++;

    if(currentIndex>=playlist.length){

        currentIndex=0;

    }

    playCurrent();

}

function playCurrent(){

    const item = playlist[currentIndex];

    if(!item) return;

    console.log("Now Playing:", item);

    if(item.type==="video"){

        promoImage.style.display="none";

        promoVideo.style.display="block";

        promoVideo.src=item.url;

        promoVideo.load();

        promoVideo.play()
        .catch(console.error);

    }

    else{

        promoVideo.pause();

        promoVideo.style.display="none";

        promoImage.style.display="block";

        promoImage.src=item.url;

        // tampil 60 detik
        setTimeout(nextMedia,60000);

    }

}

promoVideo.addEventListener(
"ended",
nextMedia
);

loadPlaylist();

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

    setQueueMode();

    console.log("📺 Display menerima queue-called:", queue);

    number.style.transform = "scale(1.3)";

    number.textContent = queue.nomor;

    // Mainkan animasi muncul
    number.classList.remove("queue-enter");
    void number.offsetWidth; // reset animation
    number.classList.add("queue-enter");

    counter.textContent = "Counter " + queue.counter;

    bell.play();

    number.classList.add("speaking");

    setTimeout(() => {

        announceQueue(queue, () => {

            console.log(">>> CALLBACK DARI DISPLAY");

            // socket.emit("announcement-finished");
            socket.emit("announcement-finished", {
            counter: queue.counter
            });

            number.classList.remove("speaking");

             // Tunggu sebentar agar nomor masih terlihat
            setTimeout(() => {

                setIdleMode();

            }, 30000);

        });

    }, 3000);

    setTimeout(() => {

        number.style.transform = "scale(1)";

    }, 250);

});

socket.on("queue-updated", () => {

    loadTimeline();

});

socket.on("playlist-updated",()=>{
    loadPlaylist();
});