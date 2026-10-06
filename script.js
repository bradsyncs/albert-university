const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {

    hamburger.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("open");

        hamburger.classList.toggle("active");

        hamburger.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            hamburger.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


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

}