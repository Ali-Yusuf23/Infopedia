//**pages */

function showpage(id) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

//**links */

document.getElementById("spotify").addEventListener("click", function() {
    window.open("https://open.spotify.com/intl-id/artist/66CXWjxzNUsdJxJ2JdwvnR", "_blank");
});

document.getElementById("youtube").addEventListener("click", function() {
    window.open("https://www.youtube.com/channel/UC9CoOnJkIBMdeijd9qYoT_g", "_blank");
});

function pop() {
    alert("Thank you for your purchase!");
}

//**pop ups */

function openpop() {
    const popup = document.getElementById("popup");
    const content = document.getElementById("popup-content");
    popup.style.display = "flex";
    content.classList.remove("close");
    content.classList.remove("open");

    void content.offsetWidth;
    content.classList.add("open");
}

function closepop() {
    const popup = document.getElementById("popup");
    const content = document.getElementById("popup-content");
    content.classList.remove("open");
    content.classList.add("close");
    setTimeout(() => {
        popup.style.display = "none";
    }, 400);
}

document.getElementById("ig").addEventListener("click", function() {
    window.open("https://www.instagram.com/aliyysff_?igsi=MXdpOWpnNnk5OG14ag==", "_blank");
});

document.getElementById("twt").addEventListener("click", function() {
    window.open("https://X.com/AliYsf23", "_blank");
});

//*search section */

const form = document.querySelector("#search-form");
const search = document.querySelector("#search");
const albums = document.querySelectorAll(".album");
form.addEventListener("submit", 
    function(event) {
    event.preventDefault();
    const keyword = search.value.toLowerCase();
    albums.forEach(album => {
        const name = album.querySelector("p").textContent.toLowerCase();
        if (name.includes(keyword)) {
            album.style.display = "";
        }else{
            album.style.display = "none";
        }
    });
});