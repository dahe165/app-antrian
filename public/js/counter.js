const currentNumber = document.getElementById("currentNumber");
const waitingList = document.getElementById("waitingList");

const btnCall = document.getElementById("btnCall");

const btnFinish = document.getElementById("btnFinish");

const btnRecall = document.getElementById("btnRecall");

const btnSkip = document.getElementById("btnSkip");

const socket = io();

// Ambil ID Counter dari URL
const params = new URLSearchParams(window.location.search);
const COUNTER_ID = Number(params.get("id") || 1);

// Ubah judul Counter
document.getElementById("counterTitle").textContent = `COUNTER ${COUNTER_ID}`;

let announcementBusy = false;

const serviceTimer = document.getElementById("serviceTimer");

let timerInterval = null;

async function setCounterStatus(status) {

    await fetch("/api/counter/status", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            id: COUNTER_ID,

            status

        })

    });

}

// Ambil nomor yang sedang dipanggil
async function loadCurrent() {

    const response = await fetch(`/api/current?counter=${COUNTER_ID}`);

    const data = await response.json();

    if(data){

        currentNumber.textContent = data.nomor;

        startServiceTimer(data.called_at);

    }else{

        currentNumber.textContent="-";

        serviceTimer.textContent="00:00";

    }

}

// Ambil daftar antrean menunggu
async function loadWaiting() {

    const response = await fetch("/api/waiting");

    const data = await response.json();

    console.log("DATA WAITING:", data);

    if (data.length === 0) {

        waitingList.innerHTML = "Belum ada antrean.";

        return;

    }

    waitingList.innerHTML = "";

    data.forEach(item => {

        waitingList.innerHTML += `
            <div class="waiting-item">
                ${item.nomor}
            </div>
        `;

    });

}

// Tombol panggil berikutnya
btnCall.addEventListener("click", async () => {

    // Cegah klik berulang
    btnCall.disabled = true;

    const teksAsli = btnCall.innerHTML;

    btnCall.innerHTML = "⏳ MEMANGGIL...";

    const response = await fetch("/api/call", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            counter: COUNTER_ID,

            layanan: "A"

        })

    });

    const result = await response.json();
    
    if (!result.success) {

        btnCall.disabled = false;
        btnCall.innerHTML = teksAsli;

        return; // tidak perlu alert lagi
    }

    await loadCurrent();

    await loadWaiting();

});

btnFinish.addEventListener("click", async () => {

    const response = await fetch("/api/finish", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            counter: COUNTER_ID

        })

    });

    const result = await response.json();

    if (!result.success) {

        alert(result.message);

        return;

    }

    await loadCurrent();
    await loadWaiting();
    clearInterval(timerInterval);
    serviceTimer.textContent = "00:00";

});

btnRecall.addEventListener("click", async () => {

    const response = await fetch("/api/recall", {

        method: "POST",

        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            counter: COUNTER_ID

        })

    });

    const result = await response.json();

    if(!result.success){

        alert(result.message);

    }

});

btnSkip.addEventListener("click", async () => {

    const response = await fetch("/api/skip", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            counter: COUNTER_ID,

            layanan:"A"

        })

    });

    const result = await response.json();

    if(!result.success){

        alert(result.message);

    }

});

// Pertama kali halaman dibuka
setCounterStatus("ONLINE");
loadCurrent();
loadWaiting();

function startServiceTimer(calledAt) {

    if (timerInterval) {

       clearInterval(timerInterval);

    }

    function update() {

        const start = new Date(calledAt.replace(" ", "T"));

        const now = new Date();

        console.log("calledAt:", calledAt);
        console.log("start:", start);
        console.log("now:", now);

        const diff = Math.floor((now - start) / 1000);

        const minutes = Math.floor(diff / 60);

        const seconds = diff % 60;

        serviceTimer.textContent =
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

    }

    update();

    timerInterval = setInterval(update,1000);

}

socket.on("announcement-status", (data) => {

    announcementBusy = data.busy;

    if (announcementBusy) {

        btnCall.disabled = true;
        btnCall.innerHTML = "🔊 Sedang Memanggil...";

    } else {

        btnCall.disabled = false;
        btnCall.innerHTML = "▶ Panggil Berikutnya";

    }

});

// Ada antrean baru dari Kiosk
socket.on("queue-updated", async () => {

    console.log("📥 Queue Updated");

    await loadWaiting();

});

socket.on("queue-called", async (queue) => {

    if (queue.counter !== COUNTER_ID) return;

    await loadCurrent();

    await loadWaiting();

});

window.addEventListener("beforeunload", () => {

    navigator.sendBeacon(
        "/api/counter/status",
        new Blob(
            [
                JSON.stringify({

                    id: COUNTER_ID,

                    status: "OFFLINE"

                })
            ],
            {
                type: "application/json"
            }
        )
    );

});