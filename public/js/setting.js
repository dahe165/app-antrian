// ======================================
// AQMS SYSTEM SETTING
// ======================================

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

// ================================
// TAB MENU
// ================================

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));

        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");

        document
            .getElementById(tab.dataset.tab)
            .classList
            .add("active");

    });

});

// ================================
// LOAD COUNTER
// ================================

async function loadCounters(){

    try{

        const response = await fetch("/api/counters");

        const counters = await response.json();

        renderCounters(counters);

    }catch(err){

        console.error(err);

    }

}

// ================================
// RENDER COUNTER
// ================================

function renderCounters(data){

    const tbody = document.getElementById("counterTable");

    tbody.innerHTML="";

    data.forEach(counter=>{

        tbody.innerHTML += `

        <tr>

            <td>${counter.id}</td>

            <td>${counter.nama}</td>

            <td>

                <span class="badge badge-${
                    counter.layanan==="A"
                    ?"blue":"green"
                }">

                    ${counter.layanan}

                </span>

            </td>

            <td>

                <span class="status ${
                    counter.status==="ONLINE"
                    ?"online":"offline"
                }">

                    ● ${counter.status}

                </span>

            </td>

            <td>

                <button class="btn-edit" data-id="${counter.id}"> ✏ Edit </button>

            </td>

        </tr>

        `;

    });

    document.querySelectorAll(".btn-edit").forEach(btn => {

        btn.addEventListener("click", () => {

            const id = btn.dataset.id;

            alert("Edit Counter ID : " + id);

        });

    });

}

// ================================
// START
// ================================

loadCounters();