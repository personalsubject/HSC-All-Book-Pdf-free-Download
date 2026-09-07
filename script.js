/* =========================================
   ADMIN MAIN PASSWORD
========================================= */

const ADMIN_PASSWORD = "NahidAdmin2026";


/* =========================================
   DEFAULT WEBSITE DATA
========================================= */

const defaultWebsiteData = {

    siteName: "HSC Education",

    description:
        "HSC শিক্ষার্থীদের জন্য বই, PDF, পরীক্ষার সাজেশন, প্রস্তুতি এবং কলেজ ভর্তি সংক্রান্ত তথ্যের একটি শিক্ষামূলক প্ল্যাটফর্ম।",

    phone:
        "01624-33-55-52",

    email:
        "আপনার Gmail",

    location:
        "কুমিল্লা, মনোহরগঞ্জ, হাসনাবাদ, মানুরা",

    books: []

};


/* =========================================
   GET WEBSITE DATA
========================================= */

function getWebsiteData() {

    const savedData =
        localStorage.getItem("websiteData");


    if (savedData) {

        try {

            return JSON.parse(savedData);

        }

        catch (error) {

            console.log(
                "Website data error"
            );

        }

    }


    localStorage.setItem(
        "websiteData",
        JSON.stringify(defaultWebsiteData)
    );


    return defaultWebsiteData;

}


/* =========================================
   SAVE WEBSITE DATA
========================================= */

function saveWebsiteData(data) {

    localStorage.setItem(
        "websiteData",
        JSON.stringify(data)
    );

}


/* =========================================
   MENU ELEMENTS
========================================= */

const profileButton =
    document.getElementById("profileButton");

const menuButton =
    document.getElementById("menuButton");

const profileMenu =
    document.getElementById("profileMenu");

const mainMenu =
    document.getElementById("mainMenu");


/* =========================================
   PROFILE MENU
========================================= */

if (profileButton) {

    profileButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            profileMenu.classList.toggle(
                "active"
            );

            mainMenu.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================
   THREE DOT MENU
========================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            mainMenu.classList.toggle(
                "active"
            );

            profileMenu.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================
   CLOSE MENUS
========================================= */

document.addEventListener(
    "click",
    function(event) {

        if (
            !profileMenu.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            profileMenu.classList.remove(
                "active"
            );

        }


        if (
            !mainMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            mainMenu.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   LOAD WEBSITE INFORMATION
========================================= */

function loadWebsiteInformation() {

    const data =
        getWebsiteData();


    document.title =
        data.siteName || "HSC Education";


    const siteName =
        document.getElementById("siteName");

    const heroName =
        document.getElementById("heroName");

    const footerSiteName =
        document.getElementById("footerSiteName");

    const copyrightName =
        document.getElementById("copyrightName");


    if (siteName) {

        siteName.textContent =
            data.siteName;

    }


    if (heroName) {

        heroName.textContent =
            data.siteName;

    }


    if (footerSiteName) {

        footerSiteName.textContent =
            data.siteName;

    }


    if (copyrightName) {

        copyrightName.textContent =
            data.siteName;

    }


    /* DESCRIPTION */

    const heroDescription =
        document.getElementById(
            "heroDescription"
        );

    const footerDescription =
        document.getElementById(
            "footerDescription"
        );


    if (heroDescription) {

        heroDescription.textContent =
            data.description;

    }


    if (footerDescription) {

        footerDescription.textContent =
            data.description;

    }


    /* CONTACT */

    const footerPhone =
        document.getElementById(
            "footerPhone"
        );

    const footerEmail =
        document.getElementById(
            "footerEmail"
        );

    const footerLocation =
        document.getElementById(
            "footerLocation"
        );


    if (footerPhone) {

        footerPhone.textContent =
            data.phone;

    }


    if (footerEmail) {

        footerEmail.textContent =
            data.email;

    }


    if (footerLocation) {

        footerLocation.textContent =
            data.location;

    }


    /* BOOKS */

    renderBooks(data.books);

}


/* =========================================
   RENDER BOOKS
========================================= */

function renderBooks(books) {

    const bookList =
        document.getElementById("bookList");

    const emptyBook =
        document.getElementById("emptyBook");


    if (!bookList) {

        return;

    }


    bookList.innerHTML = "";


    if (
        !books ||
        books.length === 0
    ) {

        emptyBook.style.display =
            "block";

        return;

    }


    emptyBook.style.display =
        "none";


    books.forEach(
        function(book) {

            const card =
                document.createElement("div");


            card.className =
                "book-card";


            let coverHTML = "";


            if (book.cover) {

                coverHTML =

                    `<img src="${book.cover}" alt="${book.title}">`;

            }

            else {

                coverHTML =

                    `<div class="book-cover">📚</div>`;

            }


            card.innerHTML =

                `
                ${coverHTML}

                <div class="book-info">

                    <h3>
                        ${book.title || "Untitled Book"}
                    </h3>

                    <p>
                        ${book.description || ""}
                    </p>

                    <div class="book-actions">

                        <button
                            class="view-btn"
                            data-pdf="${book.pdf || ""}">

                            👁 View

                        </button>

                        <button
                            class="download-btn"
                            data-pdf="${book.pdf || ""}"
                            data-title="${book.title || "Book"}">

                            ⬇ Download

                        </button>

                    </div>

                </div>
                `;


            const viewButton =
                card.querySelector(".view-btn");


            viewButton.addEventListener(
                "click",
                function() {

                    openBook(
                        book.pdf
                    );

                }
            );


            const downloadButton =
                card.querySelector(
                    ".download-btn"
                );


            downloadButton.addEventListener(
                "click",
                function() {

                    downloadBook(
                        book.pdf,
                        book.title
                    );

                }
            );


            bookList.appendChild(card);

        }
    );

}


/* =========================================
   BOOK SEARCH
========================================= */

function searchBooks() {

    const searchInput =
        document.getElementById(
            "bookSearch"
        );


    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


    const data =
        getWebsiteData();


    const filteredBooks =
        data.books.filter(
            function(book) {

                const title =
                    (book.title || "")
                    .toLowerCase();


                const description =
                    (book.description || "")
                    .toLowerCase();


                return (
                    title.includes(searchText) ||
                    description.includes(searchText)
                );

            }
        );


    renderBooks(filteredBooks);

}


/* =========================================
   SEARCH EVENTS
========================================= */

const bookSearch =
    document.getElementById("bookSearch");

const searchButton =
    document.getElementById("searchButton");


if (bookSearch) {

    bookSearch.addEventListener(
        "input",
        searchBooks
    );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchBooks
    );

}


/* =========================================
   VIEW BOOK
========================================= */

function openBook(pdf) {

    if (!pdf) {

        showToast(
            "এই বইয়ের PDF এখনো যোগ করা হয়নি।"
        );

        return;

    }


    window.open(
        pdf,
        "_blank"
    );

}


/* =========================================
   DOWNLOAD BOOK
========================================= */

function downloadBook(
    pdf,
    title
) {

    if (!pdf) {

        showToast(
            "এই বইয়ের Download File এখনো যোগ করা হয়নি।"
        );

        return;

    }


    const link =
        document.createElement("a");


    link.href = pdf;

    link.download =
        title || "Book";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


/* =========================================
   USER LOGIN CHECK
========================================= */

function checkUserLogin() {

    const userLoggedIn =
        localStorage.getItem(
            "userLoggedIn"
        );


    const securityLink =
        document.getElementById(
            "securityLink"
        );


    const securityPreview =
        document.getElementById(
            "securityPreview"
        );


    if (
        userLoggedIn === "true"
    ) {

        if (securityLink) {

            securityLink.style.display =
                "block";

        }


        if (securityPreview) {

            securityPreview.classList.add(
                "show"
            );

        }

    }

    else {

        if (securityLink) {

            securityLink.style.display =
                "none";

        }


        if (securityPreview) {

            securityPreview.classList.remove(
                "show"
            );

        }

    }

}


/* =========================================
   ADMIN CHECK
========================================= */

function isAdminLoggedIn() {

    return (
        localStorage.getItem(
            "adminLoggedIn"
        ) === "true"
    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (!toast) {

        return;

    }


    toast.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadWebsiteInformation();

        checkUserLogin();

    }
);
