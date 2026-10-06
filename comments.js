const supabaseAccess = window.supabase.createClient("https://kajklrjqzioraekaiqjb.supabase.co", "sb_publishable_3RlIKXy7T1qt-rOUVZqBXw_vWTCGoNF");

let replyToCommentId = null;
async function getComments() {
    const { data, error } = await supabaseAccess
        .from('comments')
        .select('*')
        .order('likes', { ascending: false });
    const { data: replies, error: repliesError } = await supabaseAccess
        .from('replies')
        .select('id');
    console.log(data);
    console.log(error);
    console.log(replies);
    console.log(repliesError);
    const commentsAmount = document.querySelector("#commentsAmount");
    commentsAmount.textContent = `${data.length + replies.length} comments ≣`;
    const container = document.querySelector("#comments");
    container.innerHTML = "";
    for (const comment of data) {
        const card = document.createElement("div");
        card.classList.add("comment-card");
        const time = new Date(comment.created_at).toLocaleString("id-ID");
        card.innerHTML = `
            <h3>@${comment.username}</h3><small> | ${time}</small>
            <p>${comment.comment}</p>
            <button class="like-button">⇧ Like (${comment.likes})</button>
            <button class="dislike-button">⇩ Dislike (${comment.dislikes})</button><br>
            <button class="replyButton">⤷ Reply</button><button class="showhideRepliesButton"></button><br>
            <div class="repliesContainer"></div>
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

        const mainComment = comment.id;
        const showhideRepliesButton = card.querySelector(".showhideRepliesButton");
        const { data: repliesCounter } = await supabaseAccess
                    .from('replies')
                    .select('id')
                    .eq('comment_id', mainComment);
        showhideRepliesButton.textContent = `${repliesCounter.length} Replies ⇣`;


        const mainCommentUsername = comment.username;
        
        
        const replyTo = document.querySelector("#replyTitle");
        const replyForm = document.querySelector("#replyForm");
        replyForm.style.display = "none";
        const replyButton = card.querySelector(".replyButton");
        replyButton.addEventListener("click", () => {
            replyTo.textContent = `Write Your Reply to @${comment.username}'s Comment!`;
            replyToCommentId = comment.id;
            if (replyForm.style.display === "none" || replyForm.style.display === "") {
                replyForm.style.display = "block";
            } else {
                replyForm.style.display = "none";
            }
        });



        const repliesContainer = card.querySelector(".repliesContainer");
        repliesContainer.style.display = "none";
        showhideRepliesButton.addEventListener("click", async () => {
            if (repliesContainer.style.display === "none" || repliesContainer.style.display === "") {
                const { data: replies, error } = await supabaseAccess
                    .from('replies')
                    .select('*')
                    .eq('comment_id', mainComment);
                    showhideRepliesButton.textContent = `${replies.length} Replies ⇣`;
                    repliesContainer.innerHTML = "";
                    replies.forEach(reply => {
                    const replyCard = document.createElement("div");
                    replyCard.classList.add("reply-card");
                    const replyTime = new Date(reply.created_at).toLocaleString("id-ID");
                    replyCard.innerHTML = `
                        <h4>@${reply.username} replied to @${mainCommentUsername}</h4><small> | ${replyTime}</small>
                        <p>${reply.reply}</p>
                    `;
                    repliesContainer.appendChild(replyCard);
                });
                console.log(error);
                repliesContainer.style.display = "block";
            } else {
                repliesContainer.style.display = "none";
            }
        });
        container.appendChild(card);
    }
}

replyForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const usernameRep = document.querySelector('#replier-name').value;
        const reply = document.querySelector('#reply').value;
            await supabaseAccess
                .from('replies')
                .insert([{
                    username: usernameRep,
                    reply: reply,
                    comment_id: replyToCommentId
                }]);
            replyForm.reset();
        });

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

