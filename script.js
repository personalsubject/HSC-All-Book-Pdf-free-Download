// ==========================
// MENU SYSTEM
// ==========================

const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.getElementById("sidebar");

const closeMenu =
document.getElementById("closeMenu");

const overlay =
document.getElementById("overlay");


// Open Menu

menuBtn.addEventListener("click", () => {

    sidebar.classList.add("active");

    overlay.classList.add("active");

});


// Close Menu

closeMenu.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);


function closeSidebar() {

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}


// ==========================
// ACCOUNT MENU
// ==========================

const accountBtn =
document.getElementById("accountBtn");

const accountMenu =
document.getElementById("accountMenu");


accountBtn.addEventListener("click", () => {

    accountMenu.classList.toggle("show");

});


// বাইরে ক্লিক করলে বন্ধ

document.addEventListener("click", (event) => {

    if (
        !accountBtn.contains(event.target)
        &&
        !accountMenu.contains(event.target)
    ) {

        accountMenu.classList.remove("show");

    }

});
