\# 🚰 AQMS (Antrian Queue Management System)



AQMS adalah aplikasi \*\*Queue Management System\*\* berbasis \*\*Node.js\*\*, \*\*Express\*\*, \*\*Socket.IO\*\*, dan \*\*SQLite\*\* yang dirancang untuk kebutuhan pelayanan publik seperti \*\*PDAM, Bank, Rumah Sakit, Klinik, dan Kantor Pelayanan\*\*.



Seluruh komunikasi antar Kiosk, Counter, dan Display TV berjalan secara \*\*realtime\*\* menggunakan Socket.IO.



\---



\## ✨ Fitur



\- 🎫 Ambil nomor antrean (Kiosk)

\- 🧑‍💼 Counter Operator

\- 📺 Display TV realtime

\- 🔊 Voice Announcement (Text-to-Speech)

\- ▶ Panggil antrean berikutnya

\- 🔄 Panggil ulang (Recall)

\- ✔ Selesai (Finish)

\- ⏭ Lewati antrean (Skip)

\- 🔒 Anti Double Click Protection

\- 📡 Realtime menggunakan Socket.IO

\- 💾 SQLite Database



\---



\## 📦 Instalasi



Clone repository



```bash

git clone https://github.com/dahe165/app-antrian.git

cd app-antrian

```



Install dependency



```bash

npm install

```



Jalankan aplikasi



```bash

npm run dev

```



atau



```bash

node server.js

```



Buka browser



```

http://localhost:3000

```



\---



\## 🚀 Cara Menggunakan



\### 1. Kiosk



Ambil nomor antrean.



Nomor otomatis masuk ke daftar antrean Counter.



\---



\### 2. Counter



Tekan \*\*▶ Panggil Berikutnya\*\*



\- Nomor berubah menjadi \*\*CALLING\*\*

\- Display TV menampilkan nomor

\- Voice Announcement membacakan nomor



Setelah pengumuman selesai:



\- Status berubah menjadi \*\*SERVING\*\*



Operator dapat:



\- 🔄 Recall

\- ✔ Finish

\- ⏭ Skip



\---



\### 3. Display TV



Display TV akan:



\- Menampilkan nomor yang sedang dipanggil

\- Membunyikan bel

\- Membacakan nomor antrean

\- Menampilkan Counter tujuan



\---



\## 📊 Status Antrean



| Status | Keterangan |

|---------|------------|

| WAITING | Menunggu dipanggil |

| CALLING | Sedang diumumkan |

| SERVING | Sedang dilayani |

| FINISHED | Pelayanan selesai |

| SKIPPED | Antrean dilewati |



\---



\## 🛠 Teknologi



\- Node.js

\- Express.js

\- Socket.IO

\- better-sqlite3

\- HTML, CSS, JavaScript



\---



\## ❤️ Kontribusi



Masukan, saran, dan kontribusi selalu diterima untuk membantu mengembangkan AQMS menjadi sistem antrean yang lebih baik.



Semoga proyek ini dapat bermanfaat bagi siapa pun yang ingin belajar maupun membangun sistem antrean modern.





\---



\## ☕ Tentang Proyek



AQMS dikembangkan sebagai proyek pembelajaran terbuka dengan tujuan memahami bagaimana membangun sistem antrean modern menggunakan teknologi web.



Semoga kode, ide, dan pengalaman dari proyek ini dapat membantu siapa pun yang sedang belajar atau mengembangkan sistem serupa.



Jika proyek ini bermanfaat, jangan ragu untuk memberikan ⭐ pada repository ini.

