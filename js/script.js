

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
    title: "Healthcare & Medical",
    description: "Grow your healthcare practice with targeted Meta Ads, SEO, local search optimization, and patient-focused marketing campaigns that increase appointments, and build lasting trust."
},
{
    title: "Real Estate",
    description: "Generate high-quality property enquiries through Meta Ads, performance marketing, creative campaigns, and lead generation strategies designed to connect buyers and sellers with your business."
},
{
    title: "Education & Training",
    description: "Increase student admissions and course enrollments with strategic digital marketing, social media campaigns, Meta Ads, and SEO that improve visibility and build credibility."
},
{
    title: "E-Commerce",
    description: "Drive online sales with conversion-focused Meta Ads, performance marketing, remarketing campaigns, and AI-powered customer engagement strategies that maximize your return on ad spend."
},
{
    title: "Restaurants & Cafés",
    description: "Attract more diners with local SEO, engaging social media marketing, promotional Meta Ads, and creative campaigns that increase footfall, online orders, and customer loyalty."
},
{
    title: "Fashion & Lifestyle",
    description: "Build a memorable brand with influencer-driven campaigns, Meta Ads, social media marketing, and creative branding strategies that increase engagement and product sales."
},
{
    title: "Corporate Services",
    description: "Generate qualified business leads through performance marketing, LinkedIn marketing strategies, SEO, and AI-powered digital campaigns that strengthen your brand."
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
    image:"assets/images/Driving Business Growth Through Digital Innovation.jpg",

    title:"Driving Business Growth Through Digital Innovation",

    desc:"We combine creativity, technology, and marketing expertise to build digital strategies that help businesses increase visibility, generate qualified leads, and achieve sustainable growth. Every campaign is backed by data, creativity, and a results-driven approach."
},

{
    image:"assets/images/Performance Marketing That Delivers Results.jpg",

    title:"Performance Marketing That Delivers Results",

    desc:"Our performance-focused campaigns are designed to maximize return on investment through strategic Meta Ads, SEO, audience targeting, and continuous optimization that turns marketing budgets into measurable business growth."
},

{
    image:"assets/images/Creative Ideas Powerful Execution.jpg",

    title:"Creative Ideas. Powerful Execution.",

    desc:"From branding and social media campaigns to engaging digital experiences, we create impactful marketing solutions that strengthen your brand identity and connect you with your ideal audience."
},

{
    image:"assets/images/AI-Powered Marketing Solutions.jpg",

    title:"AI-Powered Marketing Solutions",

    desc:"We leverage AI-driven automation and intelligent marketing workflows to improve efficiency, personalize customer experiences, and help businesses scale faster in today's competitive digital landscape."
},

{
    image:"assets/images/Building Long-Term Business Partnerships.jpg",

    title:"Building Long-Term Business Partnerships",

    desc:"We believe successful marketing is built on trust, transparency, and collaboration. Our goal is to become a long-term digital growth partner, helping businesses adapt, innovate, and succeed in an ever-changing online world."
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

const intro = document.getElementById("intro-loader");
const video = document.getElementById("intro-video");
const website = document.getElementById("website");

function showWebsite() {
    if (website.classList.contains("show")) return;

    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
        website.classList.add("show");
    }, 500);
}

// Play intro only once per browser session
if (sessionStorage.getItem("introPlayed")) {

    intro.style.display = "none";
    website.classList.add("show");

} else {

    sessionStorage.setItem("introPlayed", "true");

    video.addEventListener("ended", showWebsite);
    video.addEventListener("error", showWebsite);

    // Fallback if something goes wrong
    setTimeout(showWebsite, 4000);
}

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const btn = document.getElementById("submit-btn");

    btn.innerHTML = "Sending...";
    btn.disabled = true;

    emailjs.sendForm(
        "service_ao93jsf",
        "template_ikmer4e",
        this
    )
    .then(() => {

        alert("🎉 Thank you! Your enquiry has been sent successfully.");

        form.reset();

        btn.innerHTML = "Get Free Consultation →";
        btn.disabled = false;

    })
    .catch((error) => {

        console.error(error);

        alert("❌ Failed to send enquiry. Please try again.");

        btn.innerHTML = "Get Free Consultation →";
        btn.disabled = false;

    });

});

if (sessionStorage.getItem("introPlayed")) {
    document.getElementById("intro-loader").style.display = "none";
} else {
    sessionStorage.setItem("introPlayed", "true");
}