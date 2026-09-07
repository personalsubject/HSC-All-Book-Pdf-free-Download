const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");


menuBtn.onclick = function(){
  sideMenu.classList.add("show");
  menuOverlay.classList.add("show");
};


closeMenu.onclick = closeSideMenu;
menuOverlay.onclick = closeSideMenu;


function closeSideMenu(){

  sideMenu.classList.remove("show");

  menuOverlay.classList.remove("show");

}


profileBtn.onclick = function(e){

  e.stopPropagation();

  profileMenu.classList.toggle("show");

};


document.addEventListener("click",function(){

  profileMenu.classList.remove("show");

});


profileMenu.onclick = function(e){
  e.stopPropagation();
};


/* WEBSITE SETTINGS */

const settings =
JSON.parse(
  localStorage.getItem("websiteSettings")
) || {};


if(settings.name){

  document.getElementById("websiteName").innerText =
  settings.name;

  document.getElementById("navWebsiteName").innerText =
  settings.name;

  document.getElementById("footerWebsiteName").innerText =
  settings.name;

  document.getElementById("copyrightName").innerText =
  settings.name;

}


if(settings.description){

  document.getElementById("websiteDescription").innerText =
  settings.description;

  document.getElementById("footerDescription").innerText =
  settings.description;

}


if(settings.logo){

  const logoImage =
  `<img src="${settings.logo}"
  style="
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:inherit;">`;


  document.getElementById("navLogo").innerHTML =
  logoImage;

  document.getElementById("heroLogo").innerHTML =
  logoImage;

}


/* BOOKS */

const books =
JSON.parse(
  localStorage.getItem("books")
) || [];


const bookList =
document.getElementById("homeBookList");

const bookEmpty =
document.getElementById("homeBookEmpty");


function loadBooks(){

  if(!bookList) return;


  if(books.length === 0){

    bookEmpty.style.display = "block";

    return;

  }


  bookEmpty.style.display = "none";

  bookList.innerHTML = "";


  books.forEach(book => {

    const cover =
    book.cover
    ?
    `<img src="${book.cover}">`
    :
    `<i class="fa-solid fa-book"></i>`;


    bookList.innerHTML += `

      <div class="book-card">

        <div class="book-cover">

          ${cover}

        </div>

        <div class="book-info">

          <h3>${escapeHtml(book.name)}</h3>

          <div class="book-actions">

            <button
            class="view-btn"
            onclick="viewPdf('${book.pdf}')">

              👁 View

            </button>

            <a
            class="download-btn"
            href="${book.pdf}"
            download>

              ⬇ Download

            </a>

          </div>

        </div>

      </div>

    `;

  });

}


function viewPdf(pdf){

  if(!pdf){

    alert("এই বইয়ের PDF এখনো যোগ করা হয়নি");

    return;

  }


  document
  .getElementById("pdfViewer")
  .src = pdf;


  document
  .getElementById("pdfModal")
  .classList.add("show");

}


document
.getElementById("closePdfModal")
.onclick = function(){

  document
  .getElementById("pdfModal")
  .classList.remove("show");


  document
  .getElementById("pdfViewer")
  .src = "";

};


/* CONTACT */

const contact =
JSON.parse(
  localStorage.getItem("contact")
) || {};


if(contact.phone){

  document
  .getElementById("footerPhone")
  .innerText =
  "📱 Phone: " + contact.phone;

}


if(contact.gmail){

  document
  .getElementById("footerGmail")
  .innerText =
  "📧 Gmail: " + contact.gmail;

}


if(contact.location){

  document
  .getElementById("footerLocation")
  .innerText =
  "📍 Location: " + contact.location;

}


setSocial(
  "facebookLink",
  contact.facebook
);

setSocial(
  "instagramLink",
  contact.instagram
);

setSocial(
  "tiktokLink",
  contact.tiktok
);

setSocial(
  "telegramLink",
  contact.telegram
);

setSocial(
  "whatsappLink",
  contact.whatsapp
);


function setSocial(id,url){

  const link =
  document.getElementById(id);


  if(url){

    link.href = url;

    link.target = "_blank";

  }

}


/* SECURITY MENU */

if(
  localStorage.getItem("userLoggedIn")
  === "true"
){

  document
  .getElementById("securityMenu")
  .style.display = "block";

}


function escapeHtml(text){

  const div =
  document.createElement("div");

  div.innerText = text;

  return div.innerHTML;

}


loadBooks();
