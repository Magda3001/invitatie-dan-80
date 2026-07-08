/*=====================================================
                INVITAȚIE DAN - 80 ANI
=====================================================*/

"use strict";

/*=========================================
    ELEMENTE
=========================================*/

const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");

const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const letter = document.querySelector(".letter");
const seal = document.getElementById("seal");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const rsvpButton = document.getElementById("rsvpButton");

let invitationOpened = false;
let musicStarted = false;

/*=========================================
    CONFIGURARE
=========================================*/

if (music) {

    music.src = CONFIG.music;
    music.volume = 0.35;

}

/*=========================================
    WHATSAPP
=========================================*/

if (rsvpButton) {

    const message =
`Am plăcerea de a confirma participarea la aniversarea celor ${CONFIG.age} de ani ai lui ${CONFIG.celebrant}.

Ne vedem pe ${CONFIG.eventDateText} la ora ${CONFIG.eventTime}.`;

    rsvpButton.href =
        `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

}

/*=========================================
    PORNIRE MUZICĂ
=========================================*/

function playMusic(){

    if(musicStarted) return;

    musicStarted = true;

    music.play().catch(()=>{});

    musicButton.classList.add("playing");

}

/*=========================================
    BUTON MUZICĂ
=========================================*/

if(musicButton){

musicButton.addEventListener("click",()=>{

    if(music.paused){

        music.play();

        musicButton.classList.add("playing");

    }else{

        music.pause();

        musicButton.classList.remove("playing");

    }

});

}

/*=========================================
    DESCHIDERE PLIC
=========================================*/

function openInvitation(){

    if(invitationOpened) return;

    invitationOpened = true;

    seal.classList.add("hide");

    setTimeout(()=>{

        flap.classList.add("open");

    },350);

    setTimeout(()=>{

        letter.classList.add("open");

    },900);

    setTimeout(()=>{

        loader.style.opacity="0";

    },2400);

    setTimeout(()=>{

        loader.style.display="none";

        invitation.classList.add("show");

        playMusic();

    },3100);

}

if(envelope){

    envelope.addEventListener("click",openInvitation);

}

/*=========================================
    COUNTDOWN
=========================================*/

const targetDate =
new Date(CONFIG.eventDate).getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = targetDate-now;

    if(distance<=0){

        return;

    }

    const days =
    Math.floor(distance/(1000*60*60*24));

    const hours =
    Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes =
    Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds =
    Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").textContent=days;
    document.getElementById("hours").textContent=hours;
    document.getElementById("minutes").textContent=minutes;
    document.getElementById("seconds").textContent=seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);
/*=====================================================
                ANIMAȚII LA SCROLL
=====================================================*/

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

document.querySelectorAll(

".hero,.section,.card"

).forEach(el=>{

    observer.observe(el);

});

/*=====================================================
                EFECT HOVER CARDURI
=====================================================*/

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-8px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

/*=====================================================
                PARALLAX HERO
=====================================================*/

const hero=document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    if(!hero) return;

    const offset=window.pageYOffset;

    hero.style.backgroundPositionY=`${offset*0.35}px`;

});

/*=====================================================
                ÎNCĂRCARE FOTOGRAFIE
=====================================================*/

const heroPhoto=document.querySelector(".photo-frame img");

if(heroPhoto){

    heroPhoto.src=CONFIG.photo;

    heroPhoto.alt=CONFIG.celebrant;

}

/*=====================================================
                GOOGLE MAPS
=====================================================*/

const mapsButton=document.querySelector(".gold-button");

if(mapsButton){

    mapsButton.href=CONFIG.googleMaps;

}

/*=====================================================
                COMPLETARE AUTOMATĂ TEXT
=====================================================*/

document.title=`${CONFIG.celebrant} • ${CONFIG.age} de ani`;

const heroName=document.querySelector(".hero h1");

if(heroName){

    heroName.textContent=CONFIG.celebrant;

}

const heroAge=document.querySelector(".hero-age");

if(heroAge){

    heroAge.textContent=CONFIG.age;

}

const heroDate=document.querySelector(".hero-date");

if(heroDate){

    heroDate.textContent=
`${CONFIG.eventDateText} • ora ${CONFIG.eventTime}`;

}

/*=====================================================
                PREÎNCĂRCARE IMAGINE
=====================================================*/

const preloadImage=new Image();

preloadImage.src=CONFIG.photo;

/*=====================================================
                SCROLL SUS
=====================================================*/

window.scrollTo({

    top:0,

    left:0,

    behavior:"instant"

});

/*=====================================================
                REDIMENSIONARE
=====================================================*/

window.addEventListener("resize",()=>{

    updateCountdown();

});

/*=====================================================
                DEZACTIVARE DRAG PE IMAGINE
=====================================================*/

document.querySelectorAll("img").forEach(img=>{

    img.addEventListener("dragstart",(e)=>{

        e.preventDefault();

    });

});

/*=====================================================
                LOG
=====================================================*/

console.log("====================================");

console.log("Invitație încărcată cu succes");

console.log(`Invitat: ${CONFIG.celebrant}`);

console.log(`Eveniment: ${CONFIG.eventDateText}`);

console.log(`Ora: ${CONFIG.eventTime}`);

console.log("====================================");
