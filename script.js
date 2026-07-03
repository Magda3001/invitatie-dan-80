/* =========================================
   INVITAȚIE DAN - 80 ANI
   SCRIPT.JS FINAL
========================================= */

const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("envelope");
const flap = document.querySelector(".envelope-flap");
const letter = document.querySelector(".letter");
const seal = document.querySelector(".seal");
const music = document.getElementById("music");

let opened = false;

/* =========================
   OPEN ENVELOPE
========================= */

envelope.addEventListener("click", openInvitation);

function openInvitation(){

    if(opened) return;
    opened = true;

    flap.style.transform = "rotateX(180deg)";

    seal.animate([
        { transform:"translate(-50%,-50%) scale(1)" },
        { transform:"translate(-50%,-50%) scale(0.85)" },
        { transform:"translate(-50%,-50%) scale(1)" }
    ], { duration:500 });

    setTimeout(() => {
        letter.style.transform = "translateY(-240px)";
    }, 400);

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
    }, 2000);

    setTimeout(() => {
        loader.style.display = "none";
        invitation.style.display = "block";

        window.scrollTo({ top:0, behavior:"smooth" });

        startCountdown();
        startMusic();
        revealSections();

    }, 2400);
}

/* =========================
   MUSIC
========================= */

function startMusic(){

    if(!music) return;

    music.volume = 0;

    music.play().catch(()=>{});

    let v = 0;

    const fade = setInterval(() => {

        v += 0.02;
        music.volume = v;

        if(v >= 0.35){
            music.volume = 0.35;
            clearInterval(fade);
        }

    }, 100);

}

/* =========================
   COUNTDOWN
========================= */

const targetDate = new Date("2026-09-11T14:00:00");

function startCountdown(){

    setInterval(() => {

        const now = new Date();
        const diff = targetDate - now;

        if(diff <= 0) return;

        const days = Math.floor(diff / (1000*60*60*24));
        const hours = Math.floor((diff / (1000*60*60)) % 24);
        const minutes = Math.floor((diff / (1000*60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = String(hours).padStart(2,"0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");

    }, 1000);

}

/* =========================
   SCROLL REVEAL
========================= */

function revealSections(){

    const sections = document.querySelectorAll(".paper, .countdown-section, .location, .closing");

    sections.forEach(sec => {

        sec.classList.add("fade-up");

    });

    window.addEventListener("scroll", () => {

        const trigger = window.innerHeight * 0.85;

        sections.forEach(sec => {

            const top = sec.getBoundingClientRect().top;

            if(top < trigger){
                sec.classList.add("show");
            }

        });

    });

}

/* =========================
   PHOTO EFFECT
========================= */

const photo = document.querySelector(".photo-frame img");

if(photo){

    photo.addEventListener("mousemove", (e) => {

        const r = photo.getBoundingClientRect();

        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;

        photo.style.transform =
            `scale(1.05) rotateX(${ -y * 10 }deg) rotateY(${ x * 10 }deg)`;

    });

    photo.addEventListener("mouseleave", () => {
        photo.style.transform = "scale(1)";
    });

}

/* =========================
   PARTICLES
========================= */

const particles = document.getElementById("particles");

function createParticle(){

    if(!particles) return;

    const p = document.createElement("span");

    p.className = "particle";

    p.style.left = Math.random() * 100 + "%";
    p.style.width = p.style.height = (Math.random()*6 + 2) + "px";
    p.style.opacity = Math.random();

    particles.appendChild(p);

    setTimeout(() => p.remove(), 8000);

}

setInterval(createParticle, 200);

/* =========================
   CURSOR GLOW
========================= */

const glow = document.createElement("div");
glow.id = "cursorGlow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/* =========================
   TOP BUTTON
========================= */

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.id = "topButton";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    topBtn.style.opacity = window.scrollY > 500 ? "1" : "0";

});

topBtn.addEventListener("click", () => {

    window.scrollTo({ top:0, behavior:"smooth" });

});

/* =========================
   END
========================= */

console.log("Dan 80 ani • invitație încărcată");
