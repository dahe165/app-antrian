const currentNumber = document.getElementById("currentNumber");
const waitingList = document.getElementById("waitingList");

const btnCall = document.getElementById("btnCall");

// Ambil nomor yang sedang dipanggil
async function loadCurrent() {

    const response = await fetch("/api/current?counter=1");

    const data = await response.json();

    if (data) {
        currentNumber.textContent = data.nomor;
    } else {
        currentNumber.textContent = "-";
    }

}

// Ambil daftar antrean menunggu
async function loadWaiting() {

    const response = await fetch("/api/waiting");

    const data = await response.json();

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

    const response = await fetch("/api/call", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            counter: 1,

            layanan: "A"

        })

    });

    const result = await response.json();

    if (!result.success) {

        alert(result.message);

        return;

    }

    await loadCurrent();

    await loadWaiting();

});

// Pertama kali halaman dibuka
loadCurrent();
loadWaiting();