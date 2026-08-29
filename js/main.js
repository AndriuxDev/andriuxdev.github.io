/* =========================================================
   ANDRIUX STUDIOS
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   WAIT FOR PAGE TO LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.getElementById("theme-icon");

    const menuToggle =
        document.getElementById("menu-toggle");

    const navContainer =
        document.getElementById("nav-container");

    const currentYear =
        document.getElementById("current-year");


    /* =====================================================
       THEME
       ===================================================== */

    function setTheme(theme) {

        if (theme === "light") {

            document.body.classList.add(
                "light-theme"
            );

            if (themeIcon) {
                themeIcon.textContent = "☾";
            }

            if (themeToggle) {
                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );
            }

        } else {

            document.body.classList.remove(
                "light-theme"
            );

            if (themeIcon) {
                themeIcon.textContent = "☀";
            }

            if (themeToggle) {
                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );
            }

        }

    }


    /* =====================================================
       LOAD SAVED THEME
       ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "light") {

        setTheme("light");

    } else if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        /*
            No saved preference.

            Use the visitor's operating-system
            preference.
        */

        const prefersLight =
            window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;


        if (prefersLight) {

            setTheme("light");

        } else {

            setTheme("dark");

        }

    }


    /* =====================================================
       THEME TOGGLE
       ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    document.body.classList.contains(
                        "light-theme"
                    );


                if (isLight) {

                    setTheme("dark");

                    localStorage.setItem(
                        "theme",
                        "dark"
                    );

                } else {

                    setTheme("light");

                    localStorage.setItem(
                        "theme",
                        "light"
                    );

                }

            }
        );

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (menuToggle && navContainer) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navContainer.classList.toggle(
                        "menu-open"
                    );


                /*
                    Animate hamburger into X.
                */

                menuToggle.classList.toggle(
                    "menu-active",
                    isOpen
                );


                /*
                    Accessibility.
                */

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );

    }


    /* =====================================================
       CLOSE MENU WHEN NAVIGATION LINK IS CLICKED
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    if (navContainer) {

                        navContainer.classList.remove(
                            "menu-open"
                        );

                    }


                    if (menuToggle) {

                        menuToggle.classList.remove(
                            "menu-active"
                        );


                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!navContainer ||
                !menuToggle) {

                return;

            }


            const clickedInsideMenu =
                navContainer.contains(
                    event.target
                );


            const clickedMenuButton =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                navContainer.classList.remove(
                    "menu-open"
                );

                menuToggle.classList.remove(
                    "menu-active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN RESIZING TO DESKTOP
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {

                if (navContainer) {

                    navContainer.classList.remove(
                        "menu-open"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "menu-active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});
