// кнопка "menu"
const navMenu = document.querySelector('.nav__menu');
document.addEventListener("mouseover", MouseMenu);
function MouseMenu(event) {
    if (event.target.closest('.menu__list')) {
        navMenu.classList.add('_active-hover');
    }
    if (!event.target.closest('.nav__menu')) {
        navMenu.classList.remove('_active-hover');
    }
}
navMenu.addEventListener("keyup", KeyboardMenu);
function KeyboardMenu(e) {
    if (e.key === "Enter") {
        navMenu.classList.toggle('_active-hover');
    }
}
document.addEventListener("click", MobileMenu);
function MobileMenu(event) {
    if (event.target.closest('.menu__list')) {
        navMenu.classList.toggle('_active-touch');
    }
    if (!event.target.closest('.nav__menu')) {
        navMenu.classList.remove('_active-touch');
    }
}

// бургер-меню
const menuIcon = document.querySelector('.menu-icon');
const menuNav = document.querySelector('nav');
menuIcon.addEventListener("click", function(e) {
    document.body.classList.toggle('_lock');
    menuIcon.classList.toggle('_active');
    menuNav.classList.toggle('_active');
});
const navLinks = document.querySelectorAll('[data-goto]');
navLinks.forEach(navLink => {
    navLink.addEventListener("click", clickOnLink);
});
function clickOnLink(e) {
    const navLink = e.target;
    const gotoBlock = document.querySelector(navLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
    if (menuIcon.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        menuIcon.classList.remove('_active');
        menuNav.classList.remove('_active');
    }
    window.scrollTo({
        top: gotoBlockValue
    });
    e.preventDefault();
}

// первый слайдер
const swiper = new Swiper('.box1-swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {enabled: true},
    slidesPerView: 1,
    loop: true,
    freeMode: {
        enabled: true,
        sticky: true,
    },
    autoplay: {
        delay: 5000,
    },
    speed: 500,
    breakpoints: {
        768: {slidesPerView: 3},
    },
    watchSlidesProgress: true,
});

const hFF = document.querySelector('.swiper__hover');
const clickOnTheImage = document.querySelector('.swiper__click');
const swiperWrapper = document.querySelector('.swiper-wrapper');

document.addEventListener("mouseover", PCSwiper);
function PCSwiper(event) {
    if (event.target.closest('.swiper-slide-active')) {
        hFF.classList.add('_move-hover');
    }
    if (!event.target.closest('.swiper-slide-active')) {
        hFF.classList.remove('_move-hover');
        swiperWrapper.classList.remove('_left');
    }
    if (!event.target.closest('.swiper-slide-next')) {
        swiperWrapper.classList.remove('_center');
    }
    if (!event.target.closest('.swiper-slide-visible') 
        || event.target.closest('.swiper-slide-active') 
        || event.target.closest('.swiper-slide-next')) {
        swiperWrapper.classList.remove('_right');
    }
}

document.addEventListener("click", MobileSwiper);
function MobileSwiper(event) {
    if (event.target.closest('.swiper-slide-active')) {
        clickOnTheImage.classList.toggle('_move-touch');
        swiperWrapper.classList.toggle('_left');
    }
    if (!event.target.closest('.swiper-slide-active')) {
        clickOnTheImage.classList.remove('_move-touch');
        swiperWrapper.classList.remove('_left');
    }
    if (event.target.closest('.swiper-slide-next')) {
        swiperWrapper.classList.toggle('_center');
    }
    if (!event.target.closest('.swiper-slide-next')) {
        swiperWrapper.classList.remove('_center');
    }
    if (event.target.closest('.swiper-slide-visible') 
        && !event.target.closest('.swiper-slide-active') 
        && !event.target.closest('.swiper-slide-next')) {
        swiperWrapper.classList.toggle('_right');
    }
    if (!event.target.closest('.swiper-slide-visible') 
        || event.target.closest('.swiper-slide-active') 
        || event.target.closest('.swiper-slide-next')) {
        swiperWrapper.classList.remove('_right');
    }
}

// второй слайдер
const boxSixSwiper = new Swiper('.box6-swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },        
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {enabled: true},
    slidesPerView: 1,
    freeMode: {
        enabled: true,
        sticky: true,
    },
    speed: 500,
    spaceBetween: 32,
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 27,
        },
        580: {
            slidesPerView: 2,
            spaceBetween: 32,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 27,
        },
        818: {
            slidesPerView: 3,
            spaceBetween: 32,
        },
    },
    slideToClickedSlide: true,
});

// аккордеон
const spButtons = document.querySelectorAll(".address-box__city");
spButtons.forEach(pressedSpButton => {
    pressedSpButton.addEventListener("click", function() {
        this.classList.toggle("_open");
        let spContent = this.nextElementSibling;
        if (this.classList.contains("_open")){
            spContent.style.maxHeight = spContent.scrollHeight + "px";
        } else {
            spContent.style.maxHeight = "";
        }
        spButtons.forEach(anySpButton => {
            let spContent = anySpButton.nextElementSibling;
            if (anySpButton != this) {
                spContent.style.maxHeight = "";
                anySpButton.classList.remove("_open");
            }
        });
    });
});

// анимация бегущих строк при скролле
var options = {
    threshold: 0
};
var callback = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('_running');
        }
        else {entry.target.classList.remove('_running');}
    });
};
var observer = new IntersectionObserver(callback, options);
var animItems = document.querySelectorAll('.anim-item');
animItems.forEach(animItem => {
    observer.observe(animItem);
});

// обновление анимаций при смене ориентации экрана
screen.orientation.addEventListener('change', function(e) {
    var animElements = document.querySelectorAll('.anim-element');
    animElements.forEach(animElement => {
        animElement.style.animation = 'none';
        void animElement.offsetHeight;
        animElement.style.animation = '';
    });
});