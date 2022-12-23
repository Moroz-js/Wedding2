let burger = document.querySelector(".burger");
let mouseScroll = document.querySelector(".scroll-down");
let welcome = document.querySelector(".promo");
let cookieAlert = document.querySelector(".cookie-alert");
let cookieBtn = cookieAlert.querySelector(".btn");
let exploreBtn = document.querySelector(".swiper-pagination-explore-btn");
let storiesModal = document.querySelector('.stories-modal');
let storiesItems = document.querySelectorAll('.stories-image');
let body = document.body;
let html = document.querySelector('html');
let closeStoriesModalBtn = document.querySelector('.stories-modal-close')
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
function openMenu() {
	burger.classList.toggle("active");
	document.body.classList.toggle("body-lock");
	document.querySelector('.header').classList.toggle('active')
	document.querySelector("html").classList.toggle("body-lock");
	document.querySelector('.mobile-menu__title').classList.toggle('active')
	document.querySelector('.mobile-menu').classList.toggle('active')

}

burger.addEventListener("click", () => {
	openMenu()
});

const swiper = new Swiper(".promo-swiper", {
    // Optional parameters
    loop: true,
    slidesToShow: 1,
    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
		clickable: true,
    },
	autoplay: {
		delay: 6000,
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

function openStoriesModal(item) {
	storiesModal.classList.add('open');
	let img = storiesModal.querySelector('.stories-modal-image');
	img.setAttribute('src', item.getAttribute('data-modal-image'))
	body.classList.add('body-lock');
	html.classList.add('body-lock')
}

function closeStoriesModal() {
	storiesModal.classList.remove('open');
	body.classList.remove('body-lock');
	html.classList.remove('body-lock')
}
function addEventOnModalImage() {
	const img = storiesModal.querySelector('.stories-modal-image');
	img.addEventListener('click', () => {
		closeStoriesModal()
	})
	img.classList.add('chosen')
}
if(storiesModal != undefined && storiesModal != null) {
	storiesItems.forEach((item) => {
		item.addEventListener('click', () => {
			openStoriesModal(item)
			addEventOnModalImage()
		})
	})
	closeStoriesModalBtn.addEventListener('click', () => {
		closeStoriesModal()
	})
	storiesModal.addEventListener('click', (e) => {
		e.target == storiesModal ? closeStoriesModal() : ''
	})
}

const serviceSwiper = document.querySelector('.service-swiper');
if(serviceSwiper != undefined && serviceSwiper != null) {

	const options = {
		// родитель целевого элемента - область просмотра
		root: null,
		// без отступов
		rootMargin: '0px',
		// процент пересечения - половина изображения
		threshold: 0.7
	}
	const observer = new IntersectionObserver((entries, observer) => {
		// для каждой записи-целевого элемента
		entries.forEach(entry => {
			// если элемент является наблюдаемым
			if (entry.isIntersecting) {
				serviceSwiper.classList.add('active')
				animateCurrentSlide(document.querySelectorAll('.service-swiper .swiper-slide')[swiper.activeIndex])

				// прекращаем наблюдение
			} else {
				serviceSwiper.classList.remove('active')
			}
		})
	}, options)
	function animateCurrentSlide(slide) {
		let items = slide.querySelectorAll('.service-swiper-slide__title, .service-swiper-slide__subtitle, .service-swiper-slide__text-heading-title, .service-swiper-slide__text')
		items.forEach((item) => {
			item.classList.add('active')
		})
	}
	let target = document.querySelector('.service-swiper')
	observer.observe(target)
	const swiper4 = new Swiper(".service-swiper", {
		// Optional parameters
		loop: true,
		slidesPerView: 1,

		spaceBetween: 0,
		// If we need pagination
		pagination: {
			el: ".service-swiper .swiper-pagination",
			clickable: true
		},
		effect: 'fade',
		// Navigation arrows
		navigation: {
			prevEl: ".service-swiper .swiper-button-prev",
			nextEl: ".service-swiper  .swiper-button-next",
		},

	});
	swiper4.on('slideChange', function () {
		document.querySelectorAll('.service-swiper-slide__title, .service-swiper-slide__subtitle, .service-swiper-slide__text-heading-title, .service-swiper-slide__text').forEach((item) => {
			item.classList.remove('active')
		})
		animateCurrentSlide(document.querySelectorAll('.service-swiper .swiper-slide')[swiper4.activeIndex])
	});
}
