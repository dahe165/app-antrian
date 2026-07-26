\# Changelog



🚰 AQMS v0.5 Stable



Progres sekitar 70-80% fondasi dari AQMS.



Semua perubahan penting pada proyek \*\*app-antrian\*\* akan dicatat di file ini.



\## - 2026-07-27



\### 🚀 Added Fitur



| Modul                   |  Status |

| ----------------------  | :----:  |

| 🎫 Kiosk Ambil Nomor   |    ✅   |

| 📺 Display TV Realtime |    ✅   |

| 🔊 Voice Announcement  |    ✅   |

| 🧑‍💼 Counter Realtime    |    ✅   |

| ▶ Panggil              |    ✅   |

| 🔄 Recall              |    ✅   |

| ✔ Finish               |    ✅   |

| ⏭ Skip                 |    ✅   |

| 🔒 Queue Lock          |    ✅   |

| 🚫 Anti Double Click   |    ✅   |

| 📡 Socket.IO Realtime  |    ✅   |

| ⏱ Status WAITING       |    ✅   |

| 📢 Status CALLING      |    ✅   |

| 🟢 Status SERVING      |    ✅   |

| ✔ Status FINISHED      |    ✅   |

| ⏭ Status SKIPPED       |    ✅   |



Berikut ini alur yang dapat dilakukan APP-ANTRIAN


                 KIOSK
                   │
                   ▼
              WAITING
                   │
                   ▼
          ▶ Panggil Berikutnya
                   │
                   ▼
              CALLING
                   │
          Display TV + Voice
                   │
         announcement-finished
                   │
                   ▼
              SERVING
          ┌────────┼─────────┐
          │        │         │
          ▼        ▼         ▼
      Recall    Finish     Skip
          │        │         │
          │        ▼         ▼
          │    FINISHED   SKIPPED
          │                  │
          └──────────────────┘
                 lanjut antrean




\* Membuat server utama menggunakan Express.js di `server.js`.

\* Menambahkan halaman tampilan utama Kiosk antrean di folder `public/`.

\* Menambahkan sistem WebSocket (`socket.js`) untuk pembaruan nomor antrean secara real-time.

\* Menambahkan fitur panggilan suara antrean (`voice.js`).

\* Menambahkan manajemen database lokal menggunakan file `queue.db`.



\### 🔧 Fixed (Perbaikan)

\* Memperbaiki posisi file

