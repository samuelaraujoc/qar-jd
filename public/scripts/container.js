document.addEventListener('DOMContentLoaded', function () {
    const monitorSelect = document.getElementById('monitor-select-main');
    const pm25Display = document.querySelector('.centered-text');

    monitorSelect.addEventListener('change', async function () {
        const moqaID = monitorSelect.value;

        try {
            const response = await fetch(`/info/${moqaID}`);
            const data = await response.json();

            if (data.latestPM25 !== undefined) {
                console.log(data.latestPM25);
                pm25Display.textContent = data.latestPM25;
            } else {
                pm25Display.textContent = 'N/A';
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            pm25Display.textContent = 'Erro';
        }
    });
});
