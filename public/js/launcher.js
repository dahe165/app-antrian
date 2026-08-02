const socket = io();

const activityContainer = document.getElementById("activityContainer");

const popup = document.getElementById("counterPopup");

const counterMenu = document.getElementById("counterMenu");

counterMenu.addEventListener("click", async ()=>{

    popup.style.display="flex";

    loadCounters();

});

async function loadCounters(){

    const response = await fetch("/api/counters");

    const counters = await response.json();

    const list = document.getElementById("counterList");

    list.innerHTML="";

    counters.forEach(counter=>{

        list.innerHTML += `

        <button
            class="counter-btn"
            onclick="openCounter(${counter.id})">

            ${counter.status==="ONLINE"?"🟢":"🔴"}

            ${counter.name}

        </button>

        `;

    });

}

function openCounter(id){

    location.href = "/counter.html?id=" + id;

}

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.style.display="none";

    }

});

function updateClock(){

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleString("id-ID");

}

updateClock();

setInterval(updateClock,1000);

function loadHealth(){

    document.getElementById("healthContainer").innerHTML = `

        <div>🟢 Server Running</div>
        <div>💾 SQLite Connected</div>
        <div>🌐 Socket.IO Connected</div>
        <div>🚀 AQMS Version 1.0</div>

    `;

}

loadHealth();

// socket.on("activity-log", (data) => {

    // console.log("🔥 Activity:", data);

// });

function getTypeLabel(type){

    switch(type){

        case "ticket":

            return "🎫 TICKET";

        case "calling":

            return "📢 CALLING";

        case "recall":

            return "🔄 RECALL";

        case "finish":

            return "✅ FINISH";

        case "skip":

            return "⏭ SKIP";

        case "online":

            return "🟢 ONLINE";

        case "offline":

            return "🔴 OFFLINE";

        default:

            return "📡 EVENT";

    }

}

socket.on("activity-log",(data)=>{

    if(document.querySelector(".activity-empty")){

        activityContainer.innerHTML="";

    }

    const div=document.createElement("div");

    let cls="";

    switch(data.type){

        case "ticket":

        cls="activity-ticket";

        break;

        case "calling":

        cls="activity-calling";

        break;

        case "recall":

        cls="activity-recall";

        break;

        case "finish":

        cls="activity-finish";

        break;

        case "skip":

        cls="activity-skip";

        break;

        case "online":

        cls="activity-online";

        break;

        case "offline":

        cls="activity-offline";

        break;

    }

    div.className=`activity-item new ${cls}`;

    div.innerHTML = `

    <div class="activity-header">

    <span class="activity-type">

        ${getTypeLabel(data.type)}

    </span>

    <span class="activity-time">

        ${data.time}

    </span>

    </div>

    <div class="activity-message">

        ${data.message}

    </div>

    ${
    data.counter
    ? `<div class="activity-counter">${data.counter}</div>`
    : ""
    }

    `;

    activityContainer.prepend(div);
    setTimeout(()=>{

    div.classList.remove("new");

    },2000);

    while(activityContainer.children.length>5){

    activityContainer.lastChild.remove();

    }

});