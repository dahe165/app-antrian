function speak(text, callback = null) {

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "id-ID";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {

        if (callback) {
            callback();
        }

    };

    speechSynthesis.speak(utterance);

}

function announceQueue(queue, finished = null){

    console.log("Voice dipanggil:", queue);

    const prefix = queue.nomor.charAt(0);

    const digits = queue.nomor.substring(1).split("");

    const angka = {

        "0":"nol",
        "1":"satu",
        "2":"dua",
        "3":"tiga",
        "4":"empat",
        "5":"lima",
        "6":"enam",
        "7":"tujuh",
        "8":"delapan",
        "9":"sembilan"

    };

    speechSynthesis.cancel();

    speak("Nomor antrean", ()=>{

        speak(prefix, ()=>{

            speak(angka[digits[0]], ()=>{

                speak(angka[digits[1]], ()=>{

                    speak(angka[digits[2]], ()=>{

                        speak(`Silakan menuju Counter ${queue.counter}`, ()=>{

                            if(finished){
                                finished();
                            }

                        });

                    });

                });

            });

        });

    });

}