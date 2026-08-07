const tombol = document.querySelectorAll(".ambil-btn");
const hasil = document.getElementById("hasil");

const overlay = document.getElementById("overlay");
const popupNumber = document.getElementById("popup-number");

tombol.forEach(btn=>{

    btn.addEventListener("click",async()=>{

        btn.disabled=true;

        btn.innerHTML="MEMPROSES...";

        try{

            const layanan =
            btn.dataset.layanan;

            const response =
            await fetch("/api/ticket",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    layanan

                })

            });

            const data =
            await response.json();

            hasil.innerHTML="";

            popupNumber.innerHTML=
            data.nomor;

            overlay.classList.remove("hidden");

            setTimeout(()=>{

                overlay.classList.add("hidden");

                btn.disabled=false;

                btn.innerHTML="AMBIL NOMOR";

            },2000);

        }
        catch(err){

            console.error(err);

            btn.disabled=false;

            btn.innerHTML="AMBIL NOMOR";

            alert("Terjadi kesalahan.");

        }

    });

});