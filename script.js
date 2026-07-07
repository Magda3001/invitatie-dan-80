/*=====================================================
                INVITATIE DAN 80 ANI
=====================================================*/

const loader = document.getElementById("loader");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const letter = document.querySelector(".letter");
const seal = document.getElementById("seal");

const invitation = document.getElementById("invitation");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const rsvpButton = document.getElementById("rsvpButton");

let opened = false;
let musicStarted = false;

/*=====================================================
                WHATSAPP
=====================================================*/

const phone = CONFIG.whatsapp;

const whatsappMessage =

`Bună!

Confirm cu drag participarea la aniversarea celor ${CONFIG.age} de ani ai lui ${CONFIG.celebrant}.

Ne vedem pe ${CONFIG.date}!

`;

if(rsvpButton){

    rsvpButton.href =
    `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

}

/*=====================================================
                MUZICA
=====================================================*/

if(music){

    music.volume = 0.35;

}

function startMusic(){

    if(musicStarted) return;

    musicStarted = true;

    music.play().catch(()=>{});

    musicButton.classList.add("playing");

}

musicButton?.addEventListener("click",()=>{

    if(music.paused){

        music.play();

        musicButton.classList.add("playing");

    }else{

        music.pause();

        musicButton.classList.remove("playing");

    }

});

/*=====================================================
                DESCHIDERE PLIC
=====================================================*/

function openEnvelope(){

    if(opened) return;

    opened = true;

    /* ascunde sigiliul */

    seal.classList.add("hide");

    /* deschide clapeta */

    setTimeout(()=>{

        flap.classList.add("open");

    },350);

    /* scoate scrisoarea */

    setTimeout(()=>{

        letter.classList.add("open");

    },900);

    /* ascunde loader */

    setTimeout(()=>{

        loader.style.opacity="0";

    },2400);

    setTimeout(()=>{

        loader.style.display="none";

        invitation.classList.add("show");

        startMusic();

        animateSections();

    },3200);

}

envelope.addEventListener(

"click",

openEnvelope

);

/*=====================================================
                COUNTDOWN
=====================================================*/

const targetDate =

new Date(CONFIG.eventDate).getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = targetDate-now;

    if(distance<=0){

        return;

    }

    const days = Math.floor(
        distance/(1000*60*60*24)
    );

    const hours = Math.floor(
        (distance%(1000*60*60*24))/
        (1000*60*60)
    );

    const minutes = Math.floor(
        (distance%(1000*60*60))/
        (1000*60)
    );

    const seconds = Math.floor(
        (distance%(1000*60))/1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);
/*=====================================================
                ANIMAȚII LA SCROLL
=====================================================*/

function animateSections(){

    const elements = document.querySelectorAll(

        ".hero,.section,.card,.detail-card"

    );

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    elements.forEach(el=>observer.observe(el));

}

/*=====================================================
                EFECTE CARDURI
=====================================================*/

document.querySelectorAll(

".card,.detail-card"

).forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

/*=====================================================
                PARALLAX HERO
=====================================================*/

window.addEventListener("scroll",()=>{

    const hero=document.querySelector(".hero");

    if(!hero) return;

    const y=window.scrollY;

    hero.style.backgroundPosition=`center ${y*0.35}px`;

});

/*=====================================================
                APARIȚIE TITLU
=====================================================*/

window.addEventListener("load",()=>{

    const hero=document.querySelector(".hero");

    if(hero){

        hero.classList.add("show");

    }

});

/*=====================================================
                PREÎNCĂRCARE IMAGINE
=====================================================*/

const preloadImage=new Image();

preloadImage.src=CONFIG.photo;

/*=====================================================
                SCHIMBĂ IMAGINEA
=====================================================*/

const heroImage=document.querySelector(".photo-frame img");

if(heroImage){

    heroImage.src=CONFIG.photo;

    heroImage.alt=CONFIG.celebrant;

}

/*=====================================================
                MUZICA DIN CONFIG
=====================================================*/

if(music){

    music.src=CONFIG.music;

}

/*=====================================================
                ÎMPIEDICĂ SELECTAREA
=====================================================*/

document.addEventListener("dragstart",(e)=>{

    e.preventDefault();

});

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});

/*=====================================================
                REDIMENSIONARE
=====================================================*/

window.addEventListener("resize",()=>{

    updateCountdown();

});

/*=====================================================
                SCROLL TOP LA DESCHIDERE
=====================================================*/

window.scrollTo({

    top:0,

    behavior:"instant"

});

/*=====================================================
                FINAL
=====================================================*/

console.log(

`${CONFIG.celebrant} • ${CONFIG.age} ani`

);

console.log(

"Invitația a fost încărcată cu succes."

);
