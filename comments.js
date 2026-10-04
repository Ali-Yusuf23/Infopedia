const supabaseAccess = window.supabase.createClient("https://kajklrjqzioraekaiqjb.supabase.co", "sb_publishable_3RlIKXy7T1qt-rOUVZqBXw_vWTCGoNF");


async function getComments() {
    const { data, error } = await supabaseAccess
        .from('comments')
        .select('*')
        .order('likes', { ascending: false });
    console.log(data);
    console.log(error);
    const commentsAmount = document.querySelector("#commentsAmount");
    commentsAmount.textContent = `${data.length} comments ≣`;
    const container = document.querySelector("#comments");
    container.innerHTML = "";
    data.forEach(comment => {
        const card = document.createElement("div");
        const time = new Date(comment.created_at).toLocaleString("id-ID");
        card.innerHTML = `
            <h3>@${comment.username}</h3><small> | ${time}</small>
            <p>${comment.comment}</p>
            <button class="like-button">⇧ Like (${comment.likes})</button>
            <button class="dislike-button">⇩ Dislike (${comment.dislikes})</button>
        `;
        const likeButton = card.querySelector(".like-button");
        likeButton.addEventListener("click", async () => {
            const newLikes = comment.likes + 1;
            await supabaseAccess
                .from('comments')
                .update({ likes: newLikes })
                .eq('id', comment.id);
            console.log(data);
            console.log(error);
            getComments();
        });
        const dislikeButton = card.querySelector(".dislike-button");
        dislikeButton.addEventListener("click", async () => {
            const newDislikes = comment.dislikes + 1;
            await supabaseAccess
                .from('comments')
                .update({ dislikes: newDislikes })
                .eq('id', comment.id);
            console.log(data);
            console.log(error);
            getComments();
        });
        container.appendChild(card);
    });
}

getComments();


const commentFormz = document.querySelector('#commentForm');
commentFormz.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.querySelector('#commenter-name').value;
    const comment = document.querySelector('#comment').value;

    const { data, error } = await supabaseAccess
        .from('comments')
        .insert([{
            username: username,
            comment: comment,
            likes: 0,
            dislikes: 0
        }]);
    console.log(data);
    console.log(error);
    commentFormz.reset();
    getComments();
});

const commenterNameInput = document.querySelector('#commenter-name');
commenterNameInput.addEventListener('input', () => {
    commenterNameInput.value = commenterNameInput.value.replace(/\s/g, "");
});