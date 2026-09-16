console.log("comment js run")
const commentsForm = document.querySelector('#commentForm');
const comments = document.querySelector('#comments');
let data = 
JSON.parse(localStorage.getItem("comments")) || [];

function showComments() {
    comments.innerHTML = "";

    data.forEach((item, index) => {
        const div = document.createElement('div');
        const date = new Date(item.date);
        const formattedDate = date.toLocaleString('id-ID');

        div.innerHTML = `
        <b>@${item.name} </b><small>posted ${formattedDate}</small><br>
        <p>${item.comment}</p><br>
        <button onclick="likeComment(${index})">Like ${item.likes || 0}</button>
        <button onclick="dislikeComment(${index})">Dislike ${item.dislikes || 0}</button>`;

        comments.appendChild(div);
    });
}

commentsForm.addEventListener("submit",
    function(event) {
        event.preventDefault();
        const name = document.querySelector("#commenter-name").value;
        const comment = document.querySelector("#comment").value;
        data.push({
            name: name,
            comment: comment,
            likes: 0,
            dislikes: 0,
            date: new Date()
        });
    localStorage.setItem("comments",
        JSON.stringify(data));
        commentsForm.reset();
        showComments();
});

function likeComment(index) {
    data[index].likes++;
    if (data[index].dislikes > 0)
        {
            data[index].dislikes--;
        } 
    localStorage.setItem("comments",
        JSON.stringify(data)
    );
    showComments();
}

function dislikeComment(index) {
    data[index].dislikes++;
    if (data[index].likes > 0)
    {
        data[index].likes--;
    }
    localStorage.setItem("comments",
        JSON.stringify(data)
    );
    showComments();
}

showComments();