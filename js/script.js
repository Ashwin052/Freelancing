console.log("Parkit Digital Loaded");

/* MOBILE MENU */

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if(menuBtn){
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

});

/* 3D COVERFLOW */

const items = document.querySelectorAll('.coverflow-item');
const dotsContainer = document.getElementById('dots');
const currentTitle = document.getElementById('current-title');
const currentDescription = document.getElementById('current-description');

let currentIndex = 3;
let isAnimating = false;

/* INDUSTRY DATA */

const imageData = [
{
    title: "Healthcare",
    description: "Digital marketing solutions for hospitals, clinics, and healthcare providers."
},
{
    title: "Real Estate",
    description: "Generate quality property leads and increase project visibility."
},
{
    title: "Education",
    description: "Student acquisition and brand growth for educational institutions."
},
{
    title: "E-Commerce",
    description: "Drive online sales through SEO, ads, and conversion optimization."
},
{
    title: "Finance",
    description: "Build trust and generate leads for financial services and advisors."
},
{
    title: "Manufacturing",
    description: "Expand B2B reach and generate industrial business opportunities."
},
{
    title: "Hospitality",
    description: "Increase bookings and customer engagement for hotels and resorts."
}
];

/* DOTS */

if(dotsContainer){

    items.forEach((_, index) => {

        const dot = document.createElement("div");

        dot.className = "dot";

        dot.addEventListener("click", () => {
            goToIndex(index);
        });

        dotsContainer.appendChild(dot);
    });

}

const dots = document.querySelectorAll(".dot");

/* COVERFLOW */

function updateCoverflow(){

    if(isAnimating) return;

    isAnimating = true;

    items.forEach((item,index)=>{

        let offset = index - currentIndex;

        if(offset > items.length / 2){
            offset -= items.length;
        }

        if(offset < -items.length / 2){
            offset += items.length;
        }

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        let translateX = offset * 180;
        let translateZ = -absOffset * 120;
        let rotateY = -sign * 45;
        let scale = 1 - (absOffset * 0.05);

        let opacity = 1 - (absOffset * 0.15);

        if(absOffset > 3){
            opacity = 0;
        }

        item.style.transform = `
            translateX(${translateX}px)
            translateZ(${translateZ}px)
            rotateY(${rotateY}deg)
            scale(${scale})
        `;

        item.style.opacity = opacity;
        item.style.zIndex = 100 - absOffset;

    });

    if(dots.length){

        dots.forEach((dot,index)=>{
            dot.classList.toggle(
                "active",
                index === currentIndex
            );
        });

    }

    if(currentTitle){
        currentTitle.textContent =
            imageData[currentIndex].title;
    }

    if(currentDescription){
        currentDescription.textContent =
            imageData[currentIndex].description;
    }

    setTimeout(()=>{
        isAnimating = false;
    },600);

}

/* NAVIGATION */

function navigate(direction){

    currentIndex += direction;

    if(currentIndex < 0){
        currentIndex = items.length - 1;
    }

    if(currentIndex >= items.length){
        currentIndex = 0;
    }

    updateCoverflow();
}

function goToIndex(index){

    currentIndex = index;

    updateCoverflow();
}

/* CLICK ON IMAGE */

items.forEach((item,index)=>{

    item.addEventListener("click", ()=>{

        goToIndex(index);

    });

});

/* AUTO PLAY */

setInterval(()=>{

    currentIndex++;

    if(currentIndex >= items.length){
        currentIndex = 0;
    }

    updateCoverflow();

},4000);

/* INITIALIZE */

if(items.length){
    updateCoverflow();
}

/* ================= ABOUT SLIDER ================= */

const aboutSlides = [

{
    image:"assets/images/about-1.jpg",

    title:"Building The Future Of Digital Growth",

    desc:"Parkit Digital helps businesses scale through AI-powered marketing, SEO, automation and modern web experiences that generate measurable business growth."
},

{
    image:"assets/images/about-2.jpg",

    title:"Creative Strategies That Deliver Results",

    desc:"We combine creativity, technology and data to build marketing campaigns that generate measurable growth."
},

{
    image:"assets/images/about-3.jpg",

    title:"Helping Businesses Grow Smarter",

    desc:"From startups to growing brands, we create digital solutions that increase traffic, leads and revenue."
},

{
    image:"assets/images/about-4.jpg",

    title:"Driven By Innovation And AI",

    desc:"Our AI-driven automation and performance marketing strategies help businesses work smarter and grow faster."
},

{
    image:"assets/images/about-5.jpg",

    title:"Your Success Is Our Mission",

    desc:"Every project is focused on delivering long-term value, stronger branding and sustainable business growth."
}

];

let aboutIndex = 0;

const aboutImage = document.getElementById("aboutImage");
const aboutTitle = document.getElementById("aboutTitle");
const aboutDesc = document.getElementById("aboutDesc");

const aboutDots =
document.querySelectorAll(".about-dot");

function updateAboutSlider(){

    aboutImage.style.opacity = 0;
    aboutImage.style.transform = "scale(1.05)";

    setTimeout(()=>{

        aboutImage.src =
        aboutSlides[aboutIndex].image;

        aboutTitle.innerHTML =
        aboutSlides[aboutIndex].title;

        aboutDesc.innerHTML =
        aboutSlides[aboutIndex].desc;

        aboutDots.forEach(dot =>
        dot.classList.remove("active"));

        aboutDots[aboutIndex]
        .classList.add("active");

        aboutImage.style.opacity = 1;
        aboutImage.style.transform = "scale(1)";

    },250);

}

document
.getElementById("aboutNext")
.onclick = ()=>{

    aboutIndex++;

    if(aboutIndex >= aboutSlides.length){

        aboutIndex = 0;

    }

    updateAboutSlider();

}

document
.getElementById("aboutPrev")
.onclick = ()=>{

    aboutIndex--;

    if(aboutIndex < 0){

        aboutIndex =
        aboutSlides.length-1;

    }

    updateAboutSlider();

}

setInterval(()=>{

    aboutIndex++;

    if(aboutIndex >= aboutSlides.length){

        aboutIndex = 0;

    }

    updateAboutSlider();

},5000);