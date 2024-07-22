// Raproveitando Lista de monitores 
document.addEventListener('DOMContentLoaded', (event) => {
    const originalSelect = document.getElementById('monitor-select');
    
    // Para a segunda lista de monitores (mês/ano)
    const newSelect2 = document.getElementById('another-monitor-select');
    newSelect2.innerHTML = originalSelect.innerHTML;

    // Para a terceira lista de monitores (ano)
    const newSelect3 = document.getElementById('another-monitor-select3');
    newSelect3.innerHTML = originalSelect.innerHTML;
});
