'use strict'

// Heure, date & copyright
const affichZero = (nombre) => {
    return nombre < 10 ? '0' + nombre : nombre;
}
const dateEtHeure = () => {
    const infos = new Date();
    document.querySelector('#copy').innerHTML = `Copyright &copy; 2020 - ${affichZero(infos.getFullYear())} by Dylan BABONNEAU. All right reserved.`;
    document.querySelector('#date').innerHTML = `${affichZero(infos.getDate())} / ${affichZero(infos.getMonth() + 1)} / ${affichZero(infos.getFullYear())}`;
    document.querySelector('#heure_exacte').innerHTML = `${affichZero(infos.getHours())} : ${affichZero(infos.getMinutes())} : ${affichZero(infos.getSeconds())}`;
}
setInterval('dateEtHeure()');

// Validation pour formulaire de contact
const toggle_text = () => {
    // const span = document.querySelector("#ok");
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const title = document.querySelector('#title');
    const message = document.querySelector('#message');
    if(name.value && (email.value && /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email.value)) && title.value && message.value){
        // span.style.display = "inline";
    }else{
        alert('Certains champs sont manquants !');
    }
}

// Nom dans le header
let charIndex = 0;
const text = 'Dylan<br>BABONNEAU'; // texte à afficher

const taperTexte = () => {
  document.querySelector('#typeText').innerHTML = text.substr(0, charIndex); // Obtenir l'endroit où va s'afficher le texte
  charIndex++;
}
setInterval(taperTexte, 100); // interval de temps entre l'affichage de chaque lettre

// Dark / Light theme
const checkBox = document.querySelector('.checkbox');
function getCurrentTheme() {
    let theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    localStorage.getItem('theme') ? theme = localStorage.getItem('theme') : null;
    return theme;
}

function loadTheme(theme) {
    const root = document.querySelector(':root');
    const c = document.querySelector('.iconMode');
    if(theme === 'light') {
        c.classList.remove('bi-moon-stars-fill');
        c.classList.add('bi-sun');
    } else {
        c.classList.remove('bi-sun');
        c.classList.add('bi-moon-stars-fill')
    }
    root.setAttribute('color-scheme', `${theme}`)
}

checkBox.addEventListener('click', () => {
    let theme = getCurrentTheme();
    if (theme === 'dark') {
        theme = 'light';
    } else {
        theme = 'dark';
    }
    localStorage.setItem('theme', `${theme}`);
    loadTheme(theme);
})

window.addEventListener('DOMContentLoaded', () => {
    loadTheme(getCurrentTheme());
})
