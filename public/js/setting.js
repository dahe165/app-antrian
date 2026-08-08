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

            <td>${counter.name}</td>

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

            const id = Number(btn.dataset.id);

            const counter = data.find(c => c.id === id);

            if (!counter) {
                console.error("Counter tidak ditemukan:", id);
                return;
            }

            showEditCounter(counter);

        });

    });

}

// ================================
// EDIT COUNTER
// ================================

function showEditCounter(counter) {

    const oldModal = document.getElementById("editCounterModal");

    if (oldModal) {
        oldModal.remove();
    }

    const modal = document.createElement("div");

    modal.id = "editCounterModal";

    modal.innerHTML = `

        <div class="edit-modal-overlay">

            <div class="edit-modal">

                <div class="edit-modal-header">
                    <h2>Edit Counter</h2>
                    <button id="btnCloseEdit">✕</button>
                </div>

                <div class="edit-modal-body">

                    <div class="form-group">

                        <label>ID Counter</label>

                        <input
                            type="text"
                            value="${counter.id}"
                            disabled>

                    </div>

                    <div class="form-group">

                        <label>Nama Counter</label>

                        <input
                            type="text"
                            id="editCounterName"
                            value="${counter.nama || ""}">

                    </div>

                    <div class="form-group">

                        <label>Layanan</label>

                        <select id="editCounterService">

                            <option
                                value="A"
                                ${counter.layanan === "A" ? "selected" : ""}>
                                A
                            </option>

                            <option
                                value="B"
                                ${counter.layanan === "B" ? "selected" : ""}>
                                B
                            </option>

                        </select>

                    </div>

                </div>

                <div class="edit-modal-footer">

                    <button
                        id="btnCancelEdit"
                        class="btn-cancel">
                        Batal
                    </button>

                    <button
                        id="btnSaveEdit"
                        class="btn-save">
                        💾 Simpan
                    </button>

                </div>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    // ================================
    // CLOSE
    // ================================

    document
        .getElementById("btnCloseEdit")
        .addEventListener("click", closeEditCounter);

    document
        .getElementById("btnCancelEdit")
        .addEventListener("click", closeEditCounter);

    // ================================
    // SAVE
    // ================================

    document
    .getElementById("btnSaveEdit")
    .addEventListener("click", async () => {

        const nama =
            document
                .getElementById("editCounterName")
                .value
                .trim();

        const layanan =
            document
                .getElementById("editCounterService")
                .value;

        if (!nama) {

            alert("Nama Counter wajib diisi");

            return;

        }

        try {

            const response = await fetch(
                `/api/counters/${counter.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nama,
                        layanan
                    })
                }
            );

            const result = await response.json();

            console.log("STATUS:", response.status);
            console.log("HASIL:", result);

            if (!response.ok) {

                alert(result.message || "Gagal menyimpan");

                return;

            }

            closeEditCounter();

            await loadCounters();

        } catch (err) {

            console.error("Gagal menyimpan counter:", err);

            alert("Tidak dapat terhubung ke server");

        }

    });

}

// ================================
// CLOSE EDIT COUNTER
// ================================

function closeEditCounter() {

    const modal = document.getElementById("editCounterModal");

    if (modal) {

        modal.style.display = "none";

    }

}

// ================================
// START
// ================================

loadCounters();