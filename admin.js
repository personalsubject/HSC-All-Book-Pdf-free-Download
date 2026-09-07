const ADMIN_PASSWORD = "admin123";


/* LOGIN */

function adminLogin(){

  const password =
  document.getElementById("adminPassword").value;

  const message =
  document.getElementById("loginMessage");


  if(password === ADMIN_PASSWORD){

    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    window.location.href =
    "admin.html";

  }

  else{

    message.innerText =
    "❌ Password ভুল";

  }

}


/* ADMIN CHECK */

if(
  window.location.pathname.includes("admin.html")
){

  if(
    localStorage.getItem("adminLoggedIn")
    !== "true"
  ){

    window.location.href =
    "admin-login.html";

  }

}


function adminLogout(){

  localStorage.removeItem(
    "adminLoggedIn"
  );

  window.location.href =
  "index.html";

}


/* PANEL */

function openAdminPanel(id,button){

  document
  .querySelectorAll(".admin-panel")
  .forEach(panel=>{

    panel.classList.remove("active");

  });


  document
  .querySelectorAll(".admin-menu button")
  .forEach(btn=>{

    btn.classList.remove("active");

  });


  document
  .getElementById(id)
  .classList.add("active");


  button.classList.add("active");

}


/* FILE TO BASE64 */

function fileToBase64(file){

  return new Promise((resolve,reject)=>{

    const reader =
    new FileReader();

    reader.onload =
    () => resolve(reader.result);

    reader.onerror =
    reject;

    reader.readAsDataURL(file);

  });

}


/* WEBSITE SETTINGS */

async function saveWebsiteSettings(){

  const name =
  document.getElementById(
    "websiteNameInput"
  ).value;

  const description =
  document.getElementById(
    "websiteDescriptionInput"
  ).value;

  const logoFile =
  document.getElementById(
    "logoInput"
  ).files[0];


  const old =
  JSON.parse(
    localStorage.getItem("websiteSettings")
  ) || {};


  let logo =
  old.logo || "";


  if(logoFile){

    logo =
    await fileToBase64(logoFile);

  }


  localStorage.setItem(
    "websiteSettings",

    JSON.stringify({

      name:name,

      description:description,

      logo:logo

    })

  );


  alert(
    "✅ Website Settings Saved"
  );

}


/* BOOKS */

let books =
JSON.parse(
  localStorage.getItem("books")
) || [];


async function addBook(){

  const name =
  document.getElementById(
    "bookNameInput"
  ).value.trim();

  const coverFile =
  document.getElementById(
    "bookCoverInput"
  ).files[0];

  const pdfFile =
  document.getElementById(
    "bookPdfInput"
  ).files[0];


  if(!name){

    alert("Book Name দিন");

    return;

  }


  let cover = "";
  let pdf = "";


  if(coverFile){

    cover =
    await fileToBase64(coverFile);

  }


  if(pdfFile){

    pdf =
    await fileToBase64(pdfFile);

  }


  books.push({

    id:Date.now(),

    name:name,

    cover:cover,

    pdf:pdf

  });


  localStorage.setItem(
    "books",
    JSON.stringify(books)
  );


  document
  .getElementById("bookNameInput")
  .value = "";


  document
  .getElementById("bookCoverInput")
  .value = "";


  document
  .getElementById("bookPdfInput")
  .value = "";


  showAdminBooks();

  updateDashboard();

}


function showAdminBooks(){

  const list =
  document.getElementById(
    "adminBookList"
  );


  if(!list) return;


  list.innerHTML = "";


  books.forEach(book=>{

    list.innerHTML += `

      <div class="admin-item">

        <div>

          📘 <b>${escapeHtml(book.name)}</b>

        </div>

        <div class="admin-item-actions">

          <button
          class="delete-btn"
          onclick="deleteBook(${book.id})">

            Delete

          </button>

        </div>

      </div>

    `;

  });

}


function deleteBook(id){

  books =
  books.filter(
    book => book.id !== id
  );


  localStorage.setItem(
    "books",
    JSON.stringify(books)
  );


  showAdminBooks();

  updateDashboard();

}


/* SUGGESTION */

let suggestions =
JSON.parse(
  localStorage.getItem("suggestions")
) || [];


function addSuggestion(){

  const title =
  document.getElementById(
    "suggestionTitle"
  ).value;

  const text =
  document.getElementById(
    "suggestionText"
  ).value;


  if(!title){

    alert("Title দিন");

    return;

  }


  suggestions.push({

    id:Date.now(),

    title:title,

    text:text

  });


  localStorage.setItem(
    "suggestions",
    JSON.stringify(suggestions)
  );


  showAdminSuggestions();

}


function showAdminSuggestions(){

  const list =
  document.getElementById(
    "adminSuggestionList"
  );


  if(!list) return;


  list.innerHTML = "";


  suggestions.forEach(item=>{

    list.innerHTML += `

      <div class="admin-item">

        <div>

          📝 <b>${escapeHtml(item.title)}</b>

        </div>

        <button
        class="delete-btn"
        onclick="deleteSuggestion(${item.id})">

          Delete

        </button>

      </div>

    `;

  });

}


function deleteSuggestion(id){

  suggestions =
  suggestions.filter(
    item => item.id !== id
  );


  localStorage.setItem(
    "suggestions",
    JSON.stringify(suggestions)
  );


  showAdminSuggestions();

}


/* PREPARATION */

let preparations =
JSON.parse(
  localStorage.getItem("preparations")
) || [];


function addPreparation(){

  const title =
  document.getElementById(
    "preparationTitle"
  ).value;

  const text =
  document.getElementById(
    "preparationText"
  ).value;


  if(!title){

    alert("Title দিন");

    return;

  }


  preparations.push({

    id:Date.now(),

    title:title,

    text:text

  });


  localStorage.setItem(
    "preparations",
    JSON.stringify(preparations)
  );


  showAdminPreparations();

}


function showAdminPreparations(){

  const list =
  document.getElementById(
    "adminPreparationList"
  );


  if(!list) return;


  list.innerHTML = "";


  preparations.forEach(item=>{

    list.innerHTML += `

      <div class="admin-item">

        <div>

          🎯 <b>${escapeHtml(item.title)}</b>

        </div>

        <button
        class="delete-btn"
        onclick="deletePreparation(${item.id})">

          Delete

        </button>

      </div>

    `;

  });

}


function deletePreparation(id){

  preparations =
  preparations.filter(
    item => item.id !== id
  );


  localStorage.setItem(
    "preparations",
    JSON.stringify(preparations)
  );


  showAdminPreparations();

}


/* COLLEGES */

let colleges =
JSON.parse(
  localStorage.getItem("colleges")
) || [];


function addCollege(){

  const name =
  document.getElementById(
    "collegeName"
  ).value;

  const eiin =
  document.getElementById(
    "collegeEiin"
  ).value;

  const location =
  document.getElementById(
    "collegeLocation"
  ).value;

  const gpa =
  document.getElementById(
    "collegeGpa"
  ).value;


  if(!name || !eiin){

    alert(
      "College Name এবং EIIN দিন"
    );

    return;

  }


  colleges.push({

    id:Date.now(),

    name:name,

    eiin:eiin,

    location:location,

    gpa:gpa

  });


  localStorage.setItem(
    "colleges",
    JSON.stringify(colleges)
  );


  showAdminColleges();

  updateDashboard();

}


function showAdminColleges(){

  const list =
  document.getElementById(
    "adminCollegeList"
  );


  if(!list) return;


  list.innerHTML = "";


  colleges.forEach(college=>{

    list.innerHTML += `

      <div class="admin-item">

        <div>

          <b>${escapeHtml(college.name)}</b>

          <br>

          EIIN: ${escapeHtml(college.eiin)}

        </div>

        <button
        class="delete-btn"
        onclick="deleteCollege(${college.id})">

          Delete

        </button>

      </div>

    `;

  });

}


function deleteCollege(id){

  colleges =
  colleges.filter(
    college => college.id !== id
  );


  localStorage.setItem(
    "colleges",
    JSON.stringify(colleges)
  );


  showAdminColleges();

  updateDashboard();

}


/* SECURITY FILE */

let securityFiles =
JSON.parse(
  localStorage.getItem("securityFiles")
) || [];


async function addSecurityFile(){

  const name =
  document.getElementById(
    "securityName"
  ).value;

  const file =
  document.getElementById(
    "securityFile"
  ).files[0];


  if(!name){

    alert("File Name দিন");

    return;

  }


  let fileData = "";


  if(file){

    fileData =
    await fileToBase64(file);

  }


  securityFiles.push({

    id:Date.now(),

    name:name,

    file:fileData

  });


  localStorage.setItem(
    "securityFiles",
    JSON.stringify(securityFiles)
  );


  showAdminSecurity();

  updateDashboard();

}


function showAdminSecurity(){

  const list =
  document.getElementById(
    "adminSecurityList"
  );


  if(!list) return;


  list.innerHTML = "";


  securityFiles.forEach(file=>{

    list.innerHTML += `

      <div class="admin-item">

        <div>

          🔐 ${escapeHtml(file.name)}

        </div>

        <button
        class="delete-btn"
        onclick="deleteSecurity(${file.id})">

          Delete

        </button>

      </div>

    `;

  });

}


function deleteSecurity(id){

  securityFiles =
  securityFiles.filter(
    file => file.id !== id
  );


  localStorage.setItem(
    "securityFiles",
    JSON.stringify(securityFiles)
  );


  showAdminSecurity();

  updateDashboard();

}


/* CONTACT */

function saveContact(){

  const contact = {

    phone:
    document.getElementById("phone").value,

    gmail:
    document.getElementById("gmail").value,

    location:
    document.getElementById("location").value,

    facebook:
    document.getElementById("facebook").value,

    instagram:
    document.getElementById("instagram").value,

    tiktok:
    document.getElementById("tiktok").value,

    telegram:
    document.getElementById("telegram").value,

    whatsapp:
    document.getElementById("whatsapp").value

  };


  localStorage.setItem(
    "contact",
    JSON.stringify(contact)
  );


  alert(
    "✅ Contact Saved"
  );

}


/* DASHBOARD */

function updateDashboard(){

  const bookCount =
  document.getElementById("bookCount");

  const collegeCount =
  document.getElementById("collegeCount");

  const securityCount =
  document.getElementById("securityCount");


  const users =
  JSON.parse(
    localStorage.getItem("users")
  ) || [];


  if(bookCount){

    bookCount.innerText =
    books.length;

  }


  if(collegeCount){

    collegeCount.innerText =
    colleges.length;

  }


  if(securityCount){

    securityCount.innerText =
    securityFiles.length;

  }


  const userCount =
  document.getElementById("userCount");


  if(userCount){

    userCount.innerText =
    users.length;

  }

}


/* LOAD SETTINGS */

function loadAdminSettings(){

  const settings =
  JSON.parse(
    localStorage.getItem("websiteSettings")
  ) || {};


  const name =
  document.getElementById(
    "websiteNameInput"
  );

  const description =
  document.getElementById(
    "websiteDescriptionInput"
  );


  if(name){

    name.value =
    settings.name || "";

  }


  if(description){

    description.value =
    settings.description || "";

  }


  const contact =
  JSON.parse(
    localStorage.getItem("contact")
  ) || {};


  [
    "phone",
    "gmail",
    "location",
    "facebook",
    "instagram",
    "tiktok",
    "telegram",
    "whatsapp"
  ].forEach(id=>{

    const element =
    document.getElementById(id);

    if(element){

      element.value =
      contact[id] || "";

    }

  });

}


/* SAFE HTML */

function escapeHtml(text){

  const div =
  document.createElement("div");

  div.innerText =
  text || "";

  return div.innerHTML;

}


/* LOAD */

document.addEventListener(
"DOMContentLoaded",
function(){

  showAdminBooks();

  showAdminSuggestions();

  showAdminPreparations();

  showAdminColleges();

  showAdminSecurity();

  updateDashboard();

  loadAdminSettings();

});
