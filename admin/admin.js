const comments = document.querySelector("#comments");
let data = JSON.parse(localStorage.getItem("comments")) || [];

function showComments() {
    comments.innerHTML = "";

    data.forEach((item, index) => {
        const div = document.createElement('div');
        const date = new Date(item.date);
        const formattedDate = date.toLocaleString('id-ID');

        div.innerHTML = `
        <b>@${item.name} </b><small>posted ${formattedDate}</small><br>
        <p>${item.comment}</p><br>
        <small>Like ${item.likes || 0}</small>
        <small>Dislike ${item.dislikes || 0}</small>
        <button onclick="deleteComments(${index})">delete this comment</button>`;
        comments.appendChild(div);
    })
}

function deleteComments(index) {

    const sure = confirm("Are You sure want to delete this Item?");
    if(!sure) {
        return;
    }

    data.splice(index, 1);
    localStorage.setItem(
        "comments",
        JSON.stringify(data)
    );

    showComments();
}
showComments();