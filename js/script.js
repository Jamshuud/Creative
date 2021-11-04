// IBG
function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (let i = 0; i < ibg.length; i++) {
        const image = ibg[i];
        if (image.querySelector('img')) {
            image.style.backgroundImage = 'url(' + image.querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

//=================================//

// меню бургер
const menuIcon = document.querySelector(".menu__icon");
const menu = menuIcon.parentElement;

if (menuIcon && menu) {
    menuIcon.addEventListener("click", openMenu);
}

function openMenu() {
    menu.classList.toggle("_active");
    document.body.classList.toggle("_scroll-lock");
}
function closeMenu() {
    menu.classList.remove("_active");
    document.body.classList.remove("_scroll-lock")
}

//=====================================//

//скролл до элемента
const links = document.querySelectorAll(".menu__link[data-goto]");
const header = document.querySelector(".header");

if (links.length > 0) {
    for (let index = 0; index < links.length; index++) {
        let link = links[index];
        link.addEventListener("click", function (e) {
            const linkTarget = e.target;
            if (linkTarget.dataset.goto && document.querySelector(linkTarget.dataset.goto)) {
                let scrollToBlock = document.querySelector(linkTarget.dataset.goto);
                let blockCords = scrollToBlock.getBoundingClientRect().top + scrollY - header.clientHeight;
                closeMenu();
                window.scrollTo({
                    behavior: "smooth",
                    top: blockCords,
                })
                e.preventDefault();
            }
        });
    }
}



//=====================================//

// анимация при скролле
const animItems = document.querySelectorAll("._anim-item");

if (animItems.length > 0) {
    window.addEventListener("scroll", animScroll)
    function animScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animHeight = animItem.offsetHeight;
            const animOffset = offset(animItem).top;
            let animPoint = window.innerHeight - animHeight / 4;
            if (animPoint.innerHeight > window.innerHeight) {
                animPoint = window.innerHeight - window.innerHeight / 4;
            }
            //Если видно 1/4 часть элемента, добавляем класс
            if (scrollY > (animOffset - animPoint) && scrollY < (animOffset + animHeight / 4)) {
                animItem.classList.add("_active");
            } else {
                // но если есть спец класс, то класс не убираем
                if (!animItem.classList.contains("._anim-no-hide")) {
                    animItem.classList.remove("_active")
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft, };
    }
    setTimeout(animScroll(), 300)
}


//=====================================//

// Изменение шапки (заднего фона), если страница проскроллена
function fixedHeader() {
    if (header) {
        if (window.scrollY > 0) {
            header.classList.add("_scrolled");
        }
        if (window.scrollY == 0) {
            header.classList.remove("_scrolled");
        }
    }
}

window.addEventListener("scroll", fixedHeader);

//====================================//

// скролл до следующего элемента
const present = document.querySelector(".present");
const arrow = document.querySelector(".present__scroll-icon");

if (arrow) {
    arrow.addEventListener("click", scrollDown);
}

function scrollDown(e) {
    let nextBlock = present.nextElementSibling;
    let nextBlockCords = (nextBlock.getBoundingClientRect().top + scrollY) - header.clientHeight;
    console.log(nextBlockCords)
    window.scrollTo({
        top: nextBlockCords,
        behavior: "smooth",
    })
}

//==================================//