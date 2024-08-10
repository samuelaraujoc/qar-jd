document.addEventListener('DOMContentLoaded', function () {
    const monitorSelect = document.getElementById('monitor-select-main');
    const pm25Display = document.getElementById('pm25-value');
    const infoHeader = document.querySelector('.info-header');
    const smileIcon = document.querySelector('.smile-icon');
    const infoTitle = document.querySelector('.info-title h3');

    monitorSelect.addEventListener('change', async function () {
        const moqaID = monitorSelect.value;

        try {
            const response = await fetch(`/info/${moqaID}`);
            const data = await response.json();

            if (data.latestPM25 !== undefined) {
                const pm25Value = parseFloat(data.latestPM25);
                pm25Display.textContent = pm25Value;
            
                const pmIcon = document.querySelector('.icon-pm');
            
                if (pm25Value <= 25) {
                    infoHeader.style.backgroundColor = '#a8e05f'; 
                    smileIcon.src = 'img/teste img/carinhaBom.png'; 
                    infoTitle.textContent = 'Bom';
                    pmIcon.src = 'img/teste img/pmBom.png';
                } else if (pm25Value <= 50) {
                    infoHeader.style.backgroundColor = '#fdd74b'; 
                    smileIcon.src = 'img/teste img/carinhaModerado.png'; 
                    infoTitle.textContent = 'Moderado';
                    pmIcon.src = 'img/teste img/pmModerado.png'; 
                } else if (pm25Value <= 75) {
                    infoHeader.style.backgroundColor = '#fe9b57'; 
                    smileIcon.src = 'img/teste img/carinhaRuim.png';
                    infoTitle.textContent = 'Ruim';
                    pmIcon.src = 'img/teste img/pmRuim.png'; 
                } else if (pm25Value <= 125) {
                    infoHeader.style.backgroundColor = '#fe6a69'; 
                    smileIcon.src = 'img/teste img/carinhaMuitoRuim.png';
                    infoTitle.textContent = 'Muito Ruim';
                    pmIcon.src = 'img/teste img/pmMuitoRuim.png'; 
                } else {
                    infoHeader.style.backgroundColor = '#683793'; 
                    smileIcon.src = '../IMG/newCt/Iconepessimo.png'; 
                    infoTitle.textContent = 'Péssimo';
                    pmIcon.src = '../IMG/newCt/RectanglePessimo.png';
                }
            } else {
                pm25Display.textContent = 'N/A';
            }
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            pm25Display.textContent = 'Erro';
        }
    });
});
