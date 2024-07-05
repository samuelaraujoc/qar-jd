// Raproveitando Lista de monitores 
document.addEventListener('DOMContentLoaded', (event) => {
    const originalSelect = document.getElementById('monitor-select');
    const newSelect = document.getElementById('another-monitor-select');

    newSelect.innerHTML = originalSelect.innerHTML;
});
