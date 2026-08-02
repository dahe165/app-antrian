const socket = io();

async function loadDetail() {

    const response = await fetch("/api/report/detail");

    const data = await response.json();

    const tbody = document.getElementById("reportTable");

    tbody.innerHTML = "";

    data.forEach((row, index) => {

        let badge = "";

        switch (row.status) {

            case "FINISHED":
                badge = `<span class="badge finished">FINISHED</span>`;
                break;

            case "SKIPPED":
                badge = `<span class="badge skipped">SKIPPED</span>`;
                break;

            case "WAITING":
                badge = `<span class="badge waiting">WAITING</span>`;
                break;

            case "CALLING":
                badge = `<span class="badge calling">CALLING</span>`;
                break;

            case "SERVING":
                badge = `<span class="badge serving">SERVING</span>`;
                break;

            default:
                badge = row.status;

        }

        tbody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${row.nomor}</td>

            <td>${row.counter ?? "-"}</td>

            <td>${badge}</td>

            <td>${row.called_at ?? "-"}</td>

            <td>${row.finished_at ?? "-"}</td>

            <td>${row.duration}</td>

        </tr>

        `;

    });

}

async function loadReport(){

    const response = await fetch("/api/report");

    const data = await response.json();

    document.getElementById("total").textContent = data.total;

    document.getElementById("finished").textContent = data.finished;

    document.getElementById("skipped").textContent = data.skipped;

    document.getElementById("avgService").textContent="--";

    document.getElementById("bestCounter").textContent="--";

    document.getElementById("productivity").textContent="--";

}

loadReport();

loadDetail();

function updateClock(){

    document.getElementById("clock").textContent =
        new Date().toLocaleString("id-ID");

}

updateClock();

setInterval(updateClock,1000);

// Realtime
socket.on("queue-updated", async () => {

    console.log("📈 Report Updated");

    await loadReport();

    await loadDetail();

});