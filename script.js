/* ==========================================
   DAN • 80 ANI
   SCRIPT.JS
========================================== */

"use strict";

/*=============================
    ELEMENTE
=============================*/

const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");

const envelope = document.getElementById("envelope");
const flap = document.querySelector(".envelope-flap");
const letter = document.querySelector(".letter");
const seal = document.querySelector(".seal");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const topButton = document.getElementById("topButton");

const cursorGlow = document.getElementById("cursorGlow");

let invitationOpened = false;

/*=============================
    DESCHIDERE PLIC
=============================*/

if (envelope) {

    envelope.addEventListener("click", openInvitation);

}

function openInvitation() {

    if (invitationOpened) return;

    invitationOpened = true;

    flap.classList.add("open");

    seal.classList.add("hide");

    letter.classList.add("show");

    setTimeout(() => {

        loader.classList.add("fade-out");

    }, 1800);

    setTimeout(() => {

        loader.style.display = "none";

        invitation.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        animateSections();

        startCountdown();

        startMusic();

    }, 2600);

}

/*=============================
    MUZICĂ
=============================*/

function startMusic() {

    if (!music) return;

    music.volume = 0;

    music.play().catch(() => {});

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.02;

        if (volume >= 0.35) {

            volume = 0.35;

            clearInterval(fade);

        }

        music.volume = volume;

    }, 120);

}

if (musicButton) {

    musicButton.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            musicButton.classList.add("playing");

        } else {

            music.pause();

            musicButton.classList.remove("playing");

        }

    });

}
/*=========================================
            COUNTDOWN
=========================================*/

const targetDate = new Date("2026-09-11T14:00:00").getTime();

function startCountdown() {

    updateCountdown();

    setInterval(updateCountdown, 1000);

}

function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

/*=========================================
            SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(

    ".paper,\
     .timeline-item,\
     .gallery-item,\
     .location-section,\
     .countdown-section,\
     .rsvp-section,\
     .closing-section"

);

function animateSections() {

    reveal();

    window.addEventListener("scroll", reveal);

}

function reveal() {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < trigger) {

            el.classList.add("show");

        }

    });

}

/*=========================================
            TOP BUTTON
=========================================*/

if (topButton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=========================================
            CURSOR GLOW
=========================================*/

if (cursorGlow) {

    document.addEventListener("mousemove", e => {

        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";

    });

}

/*=========================================
            PHOTO EFFECT
=========================================*/

document.querySelectorAll(".photo-frame img").forEach(img => {

    img.addEventListener("mousemove", e => {

        const rect = img.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        img.style.transform =

            `scale(1.05)
             rotateX(${-y * 10}deg)
             rotateY(${x * 10}deg)`;

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});
/*=========================================
            GALERIE LIGHTBOX
=========================================*/

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImage.src = img.src;

        lightboxImage.alt = img.alt;

        document.body.style.overflow = "hidden";

    });

});

if (lightboxClose) {

    lightboxClose.addEventListener("click", closeLightbox);

}

if (lightbox) {

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

}

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

/*=========================================
            PARTICULE
=========================================*/

const particles = document.getElementById("particles");

function createParticle() {

    if (!particles) return;

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";

    const size = Math.random() * 6 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.animationDuration =
        (Math.random() * 6 + 6) + "s";

    particle.style.opacity =
        Math.random() * 0.7 + 0.2;

    particles.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 12000);

}

setInterval(createParticle, 220);

/*=========================================
            FORMULAR RSVP
=========================================*/

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

    rsvpForm.addEventListener("submit", function(e){

        e.preventDefault();

        const button =
            this.querySelector("button");

        button.disabled = true;

        button.innerHTML = "Se trimite...";

        setTimeout(()=>{

            button.innerHTML =
                "Mulțumim pentru confirmare!";

            button.classList.add("success");

            this.reset();

        },1500);

    });

}

/*=========================================
            EFECTE BUTOANE
=========================================*/

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.classList.add("hover");

    });

    btn.addEventListener("mouseleave",()=>{

        btn.classList.remove("hover");

    });

});

/*=========================================
            EFECT PARALLAX HERO
=========================================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    if(!hero) return;

    const y = window.scrollY;

    hero.style.backgroundPositionY =
        y * 0.4 + "px";

});

/*=========================================
            APARIȚIE HERO
=========================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});
/*=========================================
            PRELOAD IMAGINI
=========================================*/

function preloadImages() {

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        const img = new Image();

        img.src = image.src;

    });

}

/*=========================================
            SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

/*=========================================
            BUTON MUZICĂ
=========================================*/

if (musicButton && music) {

    music.addEventListener("play", () => {

        musicButton.classList.add("playing");

    });

    music.addEventListener("pause", () => {

        musicButton.classList.remove("playing");

    });

}

/*=========================================
            EFECTE CARDURI
=========================================*/

document.querySelectorAll(

    ".paper,\
     .count-box,\
     .gallery-item,\
     .timeline-item"

).forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =

            "translateY(-6px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/*=========================================
            SCROLL PROGRESS
=========================================*/

const progress = document.createElement("div");

progress.id = "scrollProgress";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const total =

        document.documentElement.scrollHeight
        - window.innerHeight;

    const current =

        window.scrollY;

    const percent =

        (current / total) * 100;

    progress.style.width =

        percent + "%";

});

/*=========================================
            REDIMENSIONARE
=========================================*/

window.addEventListener("resize", () => {

    reveal();

});

/*=========================================
            TASTE
=========================================*/

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeLightbox();

    }

});

/*=========================================
            INITIALIZARE
=========================================*/

window.addEventListener("load", () => {

    preloadImages();

    reveal();

    console.log("Invitația Dan 80 este pregătită.");

});

/*=========================================
            SFÂRȘIT
=========================================*/
