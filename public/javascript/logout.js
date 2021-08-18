async function logout() {
    const response = await fetch('/api/user/logout', {
        method: 'post',
        body: JSON.stringify({
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        window.location.replace('/');
    }
}

document.getElementById('logout').addEventListener('click', logout);