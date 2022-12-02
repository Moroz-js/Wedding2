let burger = document.querySelector(".burger");
let mouseScroll = document.querySelector(".scroll-down");
let welcome = document.querySelector(".promo");
let cookieAlert = document.querySelector(".cookie-alert");
let cookieBtn = cookieAlert.querySelector(".btn");
let exploreBtn = document.querySelector(".swiper-pagination-explore-btn");
if (mouseScroll != undefined && mouseScroll != null) {
    mouseScroll.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(welcome.scrollHeight);
        window.scrollTo({
            top:
                welcome.clientHeight -
                document.querySelector(".header").clientHeight,
            behavior: "smooth",
        });
    });
}

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    document.body.classList.toggle("body-lock");
    document.querySelector("html").classList.toggle("body-lock");
});

const swiper = new Swiper(".promo-swiper", {
    // Optional parameters
    loop: true,
    slidesToShow: 1,
    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
    },
});
const swiper2 = new Swiper(".about-swiper", {
    // Optional parameters
    loop: true,
    slidesToShow: 1,
    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
    },
});

swiper2.on("slideChange", function (e) {
    const slides = document.querySelectorAll(".about-swiper .swiper-slide");
    if (exploreBtn != undefined && exploreBtn != null) {
        exploreBtn.setAttribute(
            "href",
            slides[swiper2.activeIndex].getAttribute("data-explore-link")
        );
    }
});
const swiper3 = new Swiper(".testimonials-swiper", {
    // Optional parameters
    loop: true,
    slidesPerView: 3,

	spaceBetween: 40,
    // If we need pagination
    pagination: {
        el: ".testimonials-main .swiper-pagination",
		clickable: true
    },

    // Navigation arrows
    navigation: {
        prevEl: ".testimonials-main .testimonial-button-prev",
        nextEl: ".testimonials-main  .testimonial-button-next",
    },
});
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Set cookie consent
function acceptCookieConsent() {
    deleteCookie("user_cookie_consent");
    setCookie("user_cookie_consent", 1, 30);
    cookieAlert.style.display = "none";
}
let cookie_consent = getCookie("user_cookie_consent");
if (cookie_consent != "") {
    cookieAlert.style.display = "none";
} else {
    cookieAlert.style.display = "block";
}
cookieBtn.addEventListener("click", acceptCookieConsent);
