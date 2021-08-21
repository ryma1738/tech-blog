async function createPostHandler(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/api/post/', {
        method: 'post',
        body: JSON.stringify({
            title: title,
            content: content
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        window.location.replace('/dashboard');
        alert('Your Post was created successfully!');
    } else {
        alert('An error ocurred while tying to add your post. Please try again!')
    }
}

function editPostHandler(event) {
    event.preventDefault();
    const target = event.target.id;
    const targetArray = target.split(':')
    if (targetArray.length <= 1) {
        return;
    }
    const type = targetArray[0];
    const postId = targetArray[1];
    
    if (type === 'update') {
        updatePost(postId);
    } else if (type === 'delete') {
        deletePost(postId);
    } else {
        return;
    }


}

async function deletePost(postId) {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
        const response = await fetch('/api/post/' + postId, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            window.location.replace('/dashboard')
        } else {
            alert('An error ocurred while tying to delete your post. Please try again!')
            console.log(response)
        }
    }
}

async function updatePost(postId) {
    const confirmDelete = confirm('Are you sure you want to update this post?');
    if (confirmDelete) {
        const title = document.getElementById('updateTitle' + postId).value;
        const content = document.getElementById('updateContent' + postId).value;

        let updateFields = {};
        if (title && content) {
            updateFields = {
                title: title,
                content: content
            }
        } else if (title) {
            updateFields = {
                title: title
            }
        } else if (content) {
            updateFields = {
                content: content
            }
        } else {
            alert('You must change at least one field to update your post!');
            return;
        }

        const response = await fetch('/api/post/' + postId, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateFields)
        });
        if (response.ok) {
            window.location.replace('/dashboard')
        } else {
            alert('An error ocurred while tying to update your post. Please try again!')
        }
    }
}

document.getElementById('newPost').addEventListener('submit', createPostHandler);
document.getElementById('currentPosts').addEventListener('click', editPostHandler); 