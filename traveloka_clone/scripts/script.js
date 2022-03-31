
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const dropdownSections = document.querySelectorAll(".dropdown-section");

const inputWrapper = document.querySelectorAll(".input-wrapper");
const inputMask = document.querySelectorAll(".input-wrapper_mask");
const input = document.querySelectorAll(".input-wrapper_input");
const focusEmpty = document.querySelectorAll(".focus-empty");

const passwordReveal = document.getElementById("password-reveal-toggle");
const passwordRevealInitialSrc = passwordReveal.src;
const passwordInput = document.getElementById("header_navbar_login_password-input");

const sidenav = document.querySelector(".sidenav");
const sidenavList = document.querySelector(".sidenav_list");
const sidenavMask = document.querySelector(".sidenav_mask");
const sidenavOpenBtn = document.querySelector(".header_sidenav-open-btn");
const sidenavCloseBtn = document.querySelector(".header_sidenav-close-btn");

const bannersSlider = document.querySelector(".container_banners_slider");
const bannersSliderLeftBtn = document.querySelector("#banners-slider_left-btn");
const bannersSliderRightBtn = document.querySelector("#banners-slider_right-btn");

const bookingSection = document.querySelector(".container_booking_wrapper");
const bookingSectionMask = document.querySelector(".container_booking_mask");

const bookingSelect = document.querySelector(".container_booking_body_select_tick");

const bookingExpandToggle = document.querySelector(".container_booking_expand-toggle");
const bookingExpandToggleArrow = document.querySelector(".container_booking_expand-toggle svg");
const bookingCategories = document.querySelector(".container_booking_categories");
const bookingBody = document.querySelector(".container_booking_body");
const bookingCategoryNames = document.querySelectorAll(".container_booking_categories_item-name");

const partnersSliderLeftBtn = document.querySelectorAll(".container_partners_list_left-btn");
const partnersSliderRightBtn = document.querySelectorAll(".container_partners_list_right-btn");

const topDealsNames = document.querySelectorAll(".container_top-deals_name");
const topDealsUnderline = document.querySelector(".container_top-deals_navbar_underline")
const topDealsSections = document.querySelector(".container_top-deals_categories");

dropdownToggles.forEach(element => {
    element.addEventListener('mousedown', event => {
        let dropdown = element.children[1];

        dropdownToggles.forEach(ele => {
            if (ele != element) {
                ele.children[1].classList.remove("scale-1");
            }
        })

        event.stopPropagation();
        dropdown.classList.toggle("scale-1");
    });
})

dropdownSections.forEach(element => {
    element.addEventListener('mousedown', event => {
        event.stopPropagation();
    });
})

document.addEventListener('mousedown', () => {
    dropdownToggles.forEach(element => {
        element.children[1].classList.remove("scale-1");
    })
})


input.forEach(element => {
    element.addEventListener('focus', () => {
        element.parentElement.children[0].classList.add("input-focus");
    })
    element.addEventListener('blur', () => {
        element.parentElement.children[0].classList.remove("input-focus");
    })
})

inputWrapper.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.children[0].classList.add("input-hover");
    })
    element.addEventListener('mouseleave', () => {
        element.children[0].classList.remove("input-hover");
    })
})

focusEmpty.forEach(element => {
    let initialValue;
    element.addEventListener('focus', () => {
        initialValue = element.value;
        element.value = "";
    })
    element.addEventListener('blur', () => {
        element.value = initialValue;
    })
})

passwordReveal.addEventListener('mousedown', () => {
    passwordReveal.src = "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/ecb4692cdc36f3f1e4fbc98921959202.svg";
    passwordReveal.style.opacity = "0.25";
    passwordInput.type = "text";
})

passwordReveal.addEventListener('mouseup', () => {
    passwordReveal.src = passwordRevealInitialSrc;
    passwordReveal.style.opacity = "1";
    passwordInput.type = "password";
})


sidenavOpenBtn.addEventListener('click', event => {
    event.stopPropagation();
    sidenav.style.visibility = "visible";
    sidenavList.style.transform = "translateX(0px)";
    sidenavMask.style.opacity = "1";
})

sidenavList.addEventListener('click', event => {
    event.stopPropagation();
})

document.addEventListener('click', () => {
    sidenavList.style.transform = "translateX(-100vw)";
    sidenavMask.style.opacity = "0";
    sidenav.style.visibility = "hidden";
})

sidenavCloseBtn.addEventListener('click', () => {
    sidenavList.style.transform = "translateX(-100vw)";
    sidenavMask.style.opacity = "0";
    sidenav.style.visibility = "hidden";
})


var bannerPosition = 1;
var translateX = 0;

function bannersSliderToLeft() {
    if (bannerPosition != 1) {
        translateX += 488;
        bannerPosition --;
        bannersSlider.style.transform = `translateX(${translateX}px)`;
        bannersSliderBtnControl();
    }
}

function bannersSliderToRight() {
    if (bannerPosition != 5) {
        translateX -= 488;
        bannerPosition ++;
        bannersSlider.style.transform = `translateX(${translateX}px)`;
        bannersSliderBtnControl();
    }
}

function bannersSliderBtnControl() {
    if (![1, 5].includes(bannerPosition)) {
        bannersSliderLeftBtn.classList.remove("disabled-btn");
        bannersSliderRightBtn.classList.remove("disabled-btn");
    }
    if (bannerPosition == 1) {
        bannersSliderLeftBtn.classList.add("disabled-btn");
    }
    if (bannerPosition == 5) {
        bannersSliderRightBtn.classList.add("disabled-btn");
    }
}

bannersSliderLeftBtn.addEventListener('click', bannersSliderToLeft);
bannersSliderRightBtn.addEventListener('click', bannersSliderToRight);


bookingSection.addEventListener('click', event => {
    event.stopPropagation();
    bookingSection.style.zIndex = "5";
    bookingExpandToggle.style.zIndex = "6";
    bookingBody.style.zIndex = "6";
    bookingSectionMask.style.zIndex = "4";
    bookingSectionMask.style.visibility = "visible";
    bookingSectionMask.style.opacity = "1";
})

document.addEventListener('click', () => {
    bookingSectionMask.style.opacity = "0";
    bookingSectionMask.style.visibility = "hidden";
    setTimeout(() => {
        bookingSectionMask.style.zIndex = "0";
        bookingSection.style.zIndex = "0";
    }, 300);
})


bookingSelect.addEventListener('click', () => {
    bookingSelect.classList.toggle("checked");
})

bookingExpandToggle.addEventListener('click', () => {
    bookingCategories.classList.toggle("container_booking_categories--shrink");
    bookingCategoryNames.forEach((ele) => {
        ele.classList.toggle("opa-0");
    })
    bookingExpandToggleArrow.classList.toggle("rotate-180");
})



partnersSliderRightBtn.forEach(element => {
    element.parentElement.partnersSliderPosition = 0;

    element.addEventListener('click', () => {
        element.parentElement.partnersSliderPosition -= 672;
        element.parentElement.children[0].children[0].style.transform = `translateX(${element.parentElement.partnersSliderPosition}px)`;
        element.classList.toggle("inactive");
        element.parentElement.children[1].classList.toggle("inactive");
    })
})

partnersSliderLeftBtn.forEach(element => {
    element.parentElement.partnersSliderPosition = 0;

    element.addEventListener('click', () => {
        element.parentElement.partnersSliderPosition += 672;
        element.parentElement.children[0].children[0].style.transform = `translateX(${element.parentElement.partnersSliderPosition}px)`;
        element.classList.toggle("inactive");
        element.parentElement.children[2].classList.toggle("inactive");
    })
})


topDealsNames.forEach(element => {
    element.addEventListener('mousedown', () => {
        element.style.transitionDuration = "0s";
        element.style.opacity = "0.2";
    })
    
    element.addEventListener('mouseup', () => {
        let n = [...element.parentElement.parentElement.children].indexOf(element.parentElement);
        topDealsUnderline.style.transform = `translateX(${16 + 252 * n}px)`;
        
        element.style.transitionDuration = "0.25s";
        element.style.opacity = "1";

        topDealsNames.forEach(ele => {
            ele.classList.remove("container_top-deals_name--selected");
        })
        element.classList.add("container_top-deals_name--selected");
        

        [...topDealsSections.children].forEach((ele) => {
            ele.style.display = "none";
            ele.style.opacity = "0";
            ele.style.transform = "translateX(25px)";
        })

        topDealsSections.children[n].style.display = "flex";
        topDealsSections.children[n].style.opacity = "1";
        setTimeout(() => {
            topDealsSections.children[n].style.transform = "translateX(0px)";
        }, 0);
    })
})

