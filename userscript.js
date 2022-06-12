// ==UserScript==
// @name         Thirty Dollar Keybinds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Keybinds for thirty dollar website
// @author       Silkyway
// @match        https://thirtydollar.website/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thirtydollar.website
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var keybindSelectOn = false;
    var waitingForSelect = false;

    var keybinds = []

    var newBtn = document.createElement('div')
    newBtn.innerHTML = '<img src="assets/action_startpos.png"><h1>Keybinds</h1>'
    newBtn.id = 'keybindsBtn'
    newBtn.style.backgroundColor = '#3c3cff'
    document.querySelector('.playbuttons').appendChild(newBtn)

    var popup = document.createElement('div')
    popup.className = 'popup'
    popup.id = 'keybind-popup'
    popup.innerHTML = `
    <div class="popupbox">
    <h1>Select a keybind for that button</h1>
    <input type="text" id="keybind-input">

    <div style="margin-top: 25px">
                    <button id="accept-keyin" style="font-weight: bold; background: var(--emojigreen)">OK</button>
                </div>
                </div>
    `
    popup.style.display = 'none';
    document.body.appendChild(popup)

    var currentKeybindSelectButton = null;

    function acceptKeybind() {
        var key = document.getElementById('keybind-input').value
        console.log(key)
        waitingForSelect = false;
         document.getElementById('keybind-popup').style.display = 'none';
        keybinds.push({elem: currentKeybindSelectButton, key: key})
    }

    function selectSound(e) {
        currentKeybindSelectButton = e.path[0]
        document.getElementById('keybind-popup').style.display = 'flex';
        document.getElementById('keybind-input').addEventListener('keydown', e => {setTimeout(() => {document.getElementById('keybind-input').value = e.code}, 10)})
        document.getElementById('accept-keyin').addEventListener('click', acceptKeybind)
        document.querySelectorAll('.sound').forEach(elem => elem.removeEventListener('click', selectSound))
        document.querySelectorAll('.tdk-select-msg').forEach(el => el.remove())
    }

    document.querySelector('#keybindsBtn').addEventListener('click', toggleKeybinds)

    async function toggleKeybinds() {
        if (waitingForSelect) return;
        keybindSelectOn = !keybindSelectOn
        //console.log(`%c[TDK]%c Toggled Keybinds! Status: ${keybindSelectOn ? 'On' : 'False'}`, 'font-weight: bold; color: red;', '')
        if (keybindSelectOn) {
            waitingForSelect = true;
            document.getElementById('icons_container').innerHTML += '<h1 class="tdk-select-msg">Select a sound/action to set a keybind for.</h1>'
            document.querySelectorAll('.sound').forEach(elem => elem.addEventListener('click', selectSound))
        } else {
            document.querySelectorAll('.tdk-select-msg').forEach(el => el.remove())
        }
    }

    document.addEventListener('keydown', e => {
        keybinds.forEach(bind => {
            if (bind.key === e.code) bind.elem.click();
        })
    })

    // Your code here...
})();
