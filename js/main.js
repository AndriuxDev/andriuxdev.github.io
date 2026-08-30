/* =========================================================
   ANDRIUX STUDIOS
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   WAIT FOR PAGE TO LOAD
   ========================================================= */
console.log("Andriux Studios JS loaded!");

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

        const isLight =
            theme === "light";


        document.body.classList.toggle(
            "light-theme",
            isLight
        );


        if (themeIcon) {

            themeIcon.textContent =
                isLight ? "Dark Mode" : "Light Mode";

        }


        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

        }

    }


    /* =====================================================
       LOAD SAVED THEME
       ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");


    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {

        setTheme(savedTheme);

    } else {

        const prefersLight =
            window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;


        setTheme(
            prefersLight
                ? "light"
                : "dark"
        );

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


                const newTheme =
                    isLight
                        ? "dark"
                        : "light";


                setTheme(newTheme);


                localStorage.setItem(
                    "theme",
                    newTheme
                );

            }
        );

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function closeMenu(
        returnFocus = false
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


            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );


            if (returnFocus) {
                menuToggle.focus();
            }

        }

    }


    function openMenu() {

        if (!navContainer || !menuToggle) {
            return;
        }


        navContainer.classList.add(
            "menu-open"
        );


        menuToggle.classList.add(
            "menu-active"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    if (menuToggle && navContainer) {

        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const isOpen =
                    navContainer.classList.contains(
                        "menu-open"
                    );


                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

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

                    closeMenu();

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

            if (
                !navContainer ||
                !menuToggle
            ) {

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

                closeMenu();

            }

        }
    );


    /* =====================================================
       CLOSE MENU WITH ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                navContainer &&
                navContainer.classList.contains(
                    "menu-open"
                )
            ) {

                closeMenu(true);

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

                closeMenu();

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
