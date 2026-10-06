document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll("[data-page]");
    const pages = document.querySelectorAll("[data-page-section]");

    const menuToggle = document.getElementById("menuToggle");
    const navLinksContainer = document.getElementById("navLinks");


    /*
    ==========================================
    PAGE NAVIGATION
    ==========================================
    */

    function showPage(pageName) {

        const target = document.getElementById(pageName);

        if (!target) {
            return;
        }

        pages.forEach(page => {
            page.classList.remove("active");
        });

        target.classList.add("active");

        document.querySelectorAll("[data-page]").forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.page === pageName &&
                !link.classList.contains("nav-cta")
            );
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        closeMobileMenu();
    }


    function getPageFromHash() {

        const hash = window.location.hash.replace("#", "");

        if (!hash) {
            return "home";
        }

        return document.getElementById(hash)
            ? hash
            : "home";
    }


    function updatePageFromHash() {
        showPage(getPageFromHash());
    }


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const page = link.dataset.page;

            if (!page) {
                return;
            }

            event.preventDefault();

            history.pushState(
                null,
                "",
                `#${page}`
            );

            showPage(page);
        });

    });


    window.addEventListener(
        "popstate",
        updatePageFromHash
    );


    window.addEventListener(
        "hashchange",
        updatePageFromHash
    );


    /*
    ==========================================
    MOBILE MENU
    ==========================================
    */

    function closeMobileMenu() {

        navLinksContainer.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinksContainer.classList.contains("open");

        navLinksContainer.classList.toggle(
            "open",
            !isOpen
        );

        menuToggle.classList.toggle(
            "open",
            !isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );
    });


    document.addEventListener("click", event => {

        if (
            window.innerWidth <= 800 &&
            !navLinksContainer.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMobileMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {
            closeMobileMenu();
        }

    });


    /*
    ==========================================
    ROSTER FILTER
    ==========================================
    */

    const rosterTabs =
        document.querySelectorAll(".roster-tab");

    const rosterCards =
        document.querySelectorAll(".member-card");


    rosterTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const category = tab.dataset.roster;

            rosterTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            rosterCards.forEach(card => {

                card.style.display =
                    card.dataset.category === category
                        ? "grid"
                        : "none";

            });

        });

    });


    /*
    ==========================================
    TRYOUT APPLICATION
    ==========================================
    */

    const tryoutForm =
        document.getElementById("tryoutForm");

    const formMessage =
        document.getElementById("formMessage");


    if (tryoutForm) {

        tryoutForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const submitButton =
                    tryoutForm.querySelector(
                        "button[type='submit']"
                    );

                const originalText =
                    submitButton.innerHTML;

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Submitting...";


                formMessage.className =
                    "form-message";

                formMessage.textContent = "";


                const formData =
                    new FormData(tryoutForm);

                const data =
                    Object.fromEntries(formData.entries());


                try {

                    const response =
                        await fetch(
                            "/api/tryout",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(data)
                            }
                        );


                    const result =
                        await response.json();


                    if (!response.ok) {
                        throw new Error(
                            result.message ||
                            "Submission failed."
                        );
                    }


                    formMessage.className =
                        "form-message show success";

                    formMessage.textContent =
                        "Application submitted successfully. AU staff will review your application.";


                    tryoutForm.reset();


                } catch (error) {

                    formMessage.className =
                        "form-message show error";

                    formMessage.textContent =
                        error.message ||
                        "Something went wrong. Please try again.";

                } finally {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalText;

                }

            }
        );

    }


    /*
    ==========================================
    INITIAL PAGE
    ==========================================
    */

    showPage(getPageFromHash());

});