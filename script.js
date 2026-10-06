const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {

    const isOpen = mobileMenu.classList.toggle("open");

    hamburger.classList.toggle("active");

    hamburger.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Close menu when a link is clicked */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        hamburger.classList.remove("active");

        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* Close menu if the user presses Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        mobileMenu.classList.remove("open");

        hamburger.classList.remove("active");

        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});