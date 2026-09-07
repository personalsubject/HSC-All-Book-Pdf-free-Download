/* =========================
   WEBSITE DATA
========================= */

const defaultData = {

  siteName: "HSC Education",

  description:

    "HSC শিক্ষার্থীদের জন্য বই, PDF, পরীক্ষার সাজেশন, Exam Preparation এবং College Admission তথ্যের একটি শিক্ষামূলক ওয়েবসাইট।",


  phone: "01624-33-55-52",

  email: "আপনার Gmail",

  location:

    "কুমিল্লা, মনোহরগঞ্জ, হাসনাবাদ, মানুরা",


  books: [

    {

      title: "HSC Physics",

      description:

        "পদার্থবিজ্ঞান PDF বই",

      cover: "",

      pdf: ""

    },

    {

      title: "HSC Chemistry",

      description:

        "রসায়ন PDF বই",

      cover: "",

      pdf: ""

    },

    {

      title: "HSC Biology",

      description:

        "জীববিজ্ঞান PDF বই",

      cover: "",

      pdf: ""

    }

  ]

};



/* =========================
   GET DATA
========================= */

function getWebsiteData() {

  const savedData =
    localStorage.getItem("websiteData");


  if (savedData) {

    return JSON.parse(savedData);

  }


  localStorage.setItem(

    "websiteData",

    JSON.stringify(defaultData)

  );


  return defaultData;

}



/* =========================
   SAVE DATA
========================= */

function saveWebsiteData(data) {

  localStorage.setItem(

    "websiteData",

    JSON.stringify(data)

  );

}



/* =========================
   PROFILE MENU
========================= */

function toggleProfile() {

  const profileMenu =

    document.getElementById(
      "profileMenu"
    );


  const mainMenu =

    document.getElementById(
      "mainMenu"
    );


  mainMenu.style.display = "none";


  if (

    profileMenu.style.display ===
    "block"

  ) {

    profileMenu.style.display =
      "none";

  }

  else {

    profileMenu.style.display =
      "block";

  }

}



/* =========================
   THREE DOT MENU
========================= */

function toggleMenu() {

  const mainMenu =

    document.getElementById(
      "mainMenu"
    );


  const profileMenu =

    document.getElementById(
      "profileMenu"
    );


  profileMenu.style.display =
    "none";


  if (

    mainMenu.style.display ===
    "block"

  ) {

    mainMenu.style.display =
      "none";

  }

  else {

    mainMenu.style.display =
      "block";

  }

}



/* =========================
   CLOSE MENU
========================= */

document.addEventListener(

  "click",

  function(event) {


    const profileMenu =

      document.getElementById(
        "profileMenu"
      );


    const mainMenu =

      document.getElementById(
        "mainMenu"
      );


    const clickedProfile =

      event.target.closest(
        ".profile-menu"
      );


    const clickedMainMenu =

      event.target.closest(
        ".main-menu"
      );


    const clickedButton =

      event.target.closest(
        ".icon-btn"
      );


    if (

      !clickedProfile &&

      !clickedButton

    ) {

      profileMenu.style.display =
        "none";

    }


    if (

      !clickedMainMenu &&

      !clickedButton

    ) {

      mainMenu.style.display =
        "none";

    }


  }

);



/* =========================
   RENDER WEBSITE DATA
========================= */

function loadWebsiteData() {

  const data =
    getWebsiteData();


  /* SITE NAME */

  document.title =
    data.siteName;


  const siteName =

    document.getElementById(
      "siteName"
    );


  const heroName =

    document.getElementById(
      "heroName"
    );


  const footerSiteName =

    document.getElementById(
      "footerSiteName"
    );


  const copyrightName =

    document.getElementById(
      "copyrightName"
    );


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

  const phone =

    document.getElementById(
      "footerPhone"
    );


  const email =

    document.getElementById(
      "footerEmail"
    );


  const location =

    document.getElementById(
      "footerLocation"
    );


  if (phone) {

    phone.textContent =
      data.phone;

  }


  if (email) {

    email.textContent =
      data.email;

  }


  if (location) {

    location.textContent =
      data.location;

  }



  /* BOOKS */

  renderBooks(data.books);

}



/* =========================
   RENDER BOOK
========================= */

function renderBooks(books) {

  const bookList =

    document.getElementById(
      "bookList"
    );


  const emptyBook =

    document.getElementById(
      "emptyBook"
    );


  if (!bookList) return;


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

    function(book, index) {


      const bookCard =

        document.createElement(
          "div"
        );


      bookCard.className =
        "book-card";


      let coverHTML;


      if (

        book.cover &&
        book.cover !== ""

      ) {

        coverHTML =

          `

          <img
          src="${book.cover}"
          alt="${book.title}">

          `;

      }

      else {

        coverHTML =

          `

          <div class="book-cover">

          📚

          </div>

          `;

      }


      bookCard.innerHTML =

        `

        ${coverHTML}


        <div class="book-info">


          <h3>

            ${book.title}

          </h3>


          <p>

            ${book.description || ""}

          </p>


          <div class="book-actions">


            <button
            class="view-btn"
            onclick="viewBook(${index})">

            👁 View

            </button>


            <button
            class="download-btn"
            onclick="downloadBook(${index})">

            ⬇ Download

            </button>


          </div>


        </div>

        `;


      bookList.appendChild(
        bookCard
      );


    }

  );

}



/* =========================
   BOOK SEARCH
========================= */

function searchBooks() {

  const input =

    document.getElementById(
      "bookSearch"
    );


  const searchText =

    input.value
    .toLowerCase()
    .trim();


  const data =
    getWebsiteData();


  const filteredBooks =

    data.books.filter(

      function(book) {

        return (

          book.title
          .toLowerCase()
          .includes(searchText)

        );

      }

    );


  renderBooks(filteredBooks);

}



/* =========================
   VIEW BOOK
========================= */

function viewBook(index) {

  const data =
    getWebsiteData();


  const book =
    data.books[index];


  if (

    book.pdf &&
    book.pdf !== ""

  ) {

    window.open(

      book.pdf,

      "_blank"

    );

  }

  else {

    showToast(

      "এই বইয়ের PDF এখনো যোগ করা হয়নি।"

    );

  }

}



/* =========================
   DOWNLOAD BOOK
========================= */

function downloadBook(index) {

  const data =
    getWebsiteData();


  const book =
    data.books[index];


  if (

    book.pdf &&
    book.pdf !== ""

  ) {

    const link =

      document.createElement(
        "a"
      );


    link.href =
      book.pdf;


    link.download =
      book.title;


    link.click();

  }

  else {

    showToast(

      "এই বইয়ের Download File এখনো যোগ করা হয়নি।"

    );

  }

}



/* =========================
   SECURITY FILE
========================= */

function checkUserLogin() {

  const isUserLoggedIn =

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

    isUserLoggedIn ===
    "true"

  ) {

    if (securityLink) {

      securityLink.style.display =
        "block";

    }


    if (securityPreview) {

      securityPreview.classList.remove(
        "hidden"
      );

    }

  }

  else {

    if (securityLink) {

      securityLink.style.display =
        "none";

    }


    if (securityPreview) {

      securityPreview.classList.add(
        "hidden"
      );

    }

  }

}



/* =========================
   TOAST MESSAGE
========================= */

function showToast(message) {

  const toast =

    document.getElementById(
      "toast"
    );


  if (!toast) return;


  toast.textContent =
    message;


  toast.style.display =
    "block";


  setTimeout(

    function() {

      toast.style.display =
        "none";

    },

    3000

  );

}



/* =========================
   PAGE LOAD
========================= */

document.addEventListener(

  "DOMContentLoaded",

  function() {


    loadWebsiteData();


    checkUserLogin();


  }

);
