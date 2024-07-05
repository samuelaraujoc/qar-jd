//Reaproveitar  Header, nav e foorter  HTML
function loadHTML(elementId, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o HTML: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
}

window.onload = function() {
    loadHTML('header', 'includes/header.html');
    loadHTML('nav', 'includes/nav.html');
    loadHTML('footer', 'includes/footer.html');
};

