async function addComment(event) {
    event.preventDefault();
    const target = event.target.id;
    const targetArray = target.split(':');
    console.log(target, targetArray)
    if (targetArray.length === 2) {
        const postId = targetArray[1];
        const text = document.getElementById('commentText' + postId).value;
        if (!text) {
            alert('You must enter your comment before submitting it!');
            return;
        }
        const response = await fetch('/api/comment/', {
            method: 'post',
            body: JSON.stringify({
                text: text,
                post_id: parseInt(postId)
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            window.location.replace('/home');
        } else {
            alert('An error ocurred while tying to post your comment. Please try again!');
            console.log(response);
        }
    }
}

document.getElementById('posts').addEventListener('click', addComment);