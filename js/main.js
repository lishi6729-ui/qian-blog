/* =========================
   页面加载完成
========================= */

document.addEventListener("DOMContentLoaded", () => {

    initCursorGlow();

    initScrollReveal();

    initNavbarHide();

    initSmoothScroll();

    createStars();

    removeLoadingScreen();

});

/* =========================
   鼠标光晕跟随
========================= */

function initCursorGlow() {

    const glow = document.querySelector(".cursor-glow");

    if (!glow) return;

    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

}

/* =========================
   内容区滚动显现
========================= */

function initScrollReveal() {

    const sections =
        document.querySelectorAll(".content-section");

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

    sections.forEach(section => {

        observer.observe(section);

    });

}

/* =========================
   导航栏自动隐藏
========================= */

function initNavbarHide() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        let current =
            window.pageYOffset;

        if (current > lastScroll &&
            current > 150) {

            navbar.classList.add("hide");

        } else {

            navbar.classList.remove("hide");

        }

        lastScroll = current;

    });

}

/* =========================
   平滑滚动
========================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

}

/* =========================
   星空粒子生成
========================= */

function createStars() {

    const amount = 60;

    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("div");

        star.classList.add("star");

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDuration =
            (Math.random() * 4 + 2) + "s";

        star.style.opacity =
            Math.random();

        document.body.appendChild(star);

    }

}

/* =========================
   加载页消失
========================= */

function removeLoadingScreen() {

    const loading =
        document.querySelector(
            ".loading-screen"
        );

    if (!loading) return;

    setTimeout(() => {

        loading.style.opacity = "0";

        loading.style.transition =
            "1s";

        setTimeout(() => {

            loading.remove();

        }, 1000);

    }, 1500);

}

/* =========================
   页面滚动进度
========================= */

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const docHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const progress =
        scrollTop / docHeight;

    document.documentElement.style.setProperty(

        "--scroll-progress",
        progress

    );

});

/* =========================
   Hero区域轻微视差
========================= */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    let offset =
        window.scrollY * 0.3;

    hero.style.transform =
        `translateY(${offset}px)`;

});

/* =========================
   卡片视差效果
========================= */

const cards =
    document.querySelectorAll(
        ".post-card, .project-card"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 20;

            const rotateY =
                (centerX - x) / 20;

            card.style.transform =
                `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                `;
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                `
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
                `;

        }
    );

});

/* =========================
   星空标题发光
========================= */

const title =
    document.querySelector(
        ".glass-card h1"
    );

if (title) {

    setInterval(() => {

        title.style.textShadow =
            `
            0 0 10px rgba(130,150,255,.6),
            0 0 30px rgba(130,150,255,.4)
            `;

        setTimeout(() => {

            title.style.textShadow = "none";

        }, 1500);

    }, 5000);

}

/* =========================
   返回顶部按钮接口
========================= */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* =========================
   当前年份自动更新接口
========================= */

const year =
    document.querySelector(".year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}