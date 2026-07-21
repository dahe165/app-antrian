const tombol = document.getElementById("ambil");
const hasil = document.getElementById("hasil");

const overlay = document.getElementById("overlay");
const popupNumber = document.getElementById("popup-number");

tombol.addEventListener("click", async () => {

    tombol.disabled = true;
    tombol.innerHTML = "MEMPROSES...";

    try {

        const response = await fetch("/api/ticket", {
            method: "POST"
        });

        const data = await response.json();

        // Tidak perlu lagi tampil di halaman utama
        hasil.innerHTML = "";

        // Isi nomor pada Success Card
        popupNumber.innerHTML = data.nomor;

        // Tampilkan Success Card
        overlay.classList.remove("hidden");

        // Tutup otomatis setelah 2 detik
        setTimeout(() => {

            overlay.classList.add("hidden");

            tombol.disabled = false;
            tombol.innerHTML = "AMBIL NOMOR";

        }, 2000);

    } catch (err) {

        console.error(err);

        tombol.disabled = false;
        tombol.innerHTML = "AMBIL NOMOR";

        alert("Terjadi kesalahan.");

    }

});