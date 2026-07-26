/*
=========================================
AQMS Queue Lock Manager
Developed by Vicky Vadila
Development assisted by ChatGPT (OpenAI)
=========================================
*/

let locked = false;

function isLocked() {
    return locked;
}

function lock() {
    locked = true;
}

function unlock() {
    locked = false;
}

module.exports = {
    isLocked,
    lock,
    unlock
};