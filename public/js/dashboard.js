const socket = io();

async function loadDashboard(){

    const response = await fetch("/api/dashboard");

    const data = await response.json();

    document.getElementById("total").textContent = data.total;

    document.getElementById("waiting").textContent = data.waiting;

    document.getElementById("calling").textContent = data.calling;

    document.getElementById("serving").textContent = data.serving;

    document.getElementById("finished").textContent = data.finished;

    document.getElementById("skipped").textContent = data.skipped;

}

loadDashboard();

async function loadCounters() {

    const response = await fetch("/api/dashboard/counters");

    const counters = await response.json();

    const container = document.getElementById("counterContainer");

    container.innerHTML = "";

    counters.forEach(counter => {

    let statusBadge = `
        <span class="badge ${counter.status === "ONLINE" ? "online" : "offline"}">
            ${counter.status}
        </span>
    `;

    let queueBadge = "-";

    if(counter.queue_status){

        let cls="waiting";

        if(counter.queue_status==="CALLING") cls="calling";

        if(counter.queue_status==="SERVING") cls="serving";

        queueBadge=`
            <span class="badge ${cls}">
                ${counter.queue_status}
            </span>
        `;

    }

    container.innerHTML += `

    <div class="counter-card">

        <div class="counter-title">

            ${counter.status==="ONLINE"?"🟢":"🔴"} ${counter.name}

        </div>

        <hr>

        <div class="counter-item">

            Status<br>

            ${statusBadge}

        </div>

        <div class="counter-item">

            Aktivitas<br>

            ${queueBadge}

        </div>

        <div class="counter-item">

            Nomor

            <div class="number">

                ${counter.nomor ?? "-"}

            </div>

        </div>

    </div>

    `;

});

}

loadCounters();

function updateClock(){

    const now = new Date();

    document.getElementById("clock").textContent = now.toLocaleString("id-ID");

}

updateClock();

setInterval(updateClock,1000);

socket.on("queue-updated", async () => {

    console.log("📊 Dashboard Updated");

    await loadDashboard();
  
    await loadCounters();

});