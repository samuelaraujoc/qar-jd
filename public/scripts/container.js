document.addEventListener('DOMContentLoaded', function () {
    const monitorSelect = document.getElementById('monitor-select-main');
    const pm25Display = document.getElementById('pm25-value');
    const infoHeader = document.querySelector('.info-header');
    const smileIcon = document.querySelector('.smile-icon');
    const infoTitle = document.querySelector('.info-title h3');
    const timestampDisplay = document.getElementById('timestamp-value');

    monitorSelect.addEventListener('change', async function () {
        const moqaID = monitorSelect.value;
       
        try {
            const response = await fetch(`/info/${moqaID}`);
            const data = await response.json();

            if (data.latestPM25 !== undefined) {
                const pm25Value = parseFloat(data.latestPM25);
                pm25Display.textContent = pm25Value;

                const pmIcon = document.querySelector('.icon-pm');
                const maskIcon = document.querySelector('.recomendation img[alt="Uso de máscara"]');
                const exerciseIcon = document.querySelector('.recomendation.ml-5 img[alt="Exercícios ao ar livre"]');
                const maskText = document.querySelector('.recomendation p strong');
                const exerciseText = document.querySelector('.recomendation.ml-5 p strong');

                if (pm25Value <= 25) {
                    infoHeader.style.backgroundColor = '#a8e05f';
                    smileIcon.src = '../IMG/newCt/IconeVerde.png';
                    infoTitle.textContent = 'Bom';
                    pmIcon.src = '../IMG/newCt/mVerde.png';
                    maskIcon.src = '../IMG/newCt/Bverde.png';
                    exerciseIcon.src = '../IMG/newCt/Jverde.png';
                    maskText.textContent = 'Exercícios ao ar livre';
                    exerciseText.textContent = 'Janelas abertas';
                } else if (pm25Value <= 50) {
                    infoHeader.style.backgroundColor = '#fdd64b';
                    smileIcon.src = '../IMG/newCt/IconeNeutro.png';
                    infoTitle.textContent = 'Moderado';
                    pmIcon.src = '../IMG/newCt/mAmarelo.png';
                    maskIcon.src = '../IMG/newCt/BAmerela.png';
                    exerciseIcon.src = '../IMG/newCt/JAmarela.png';
                    maskText.textContent = 'Grupos sensíveis devem reduzir atividades ao ar livre';
                    exerciseText.textContent = 'Feche janelas para evitar poluição externa do ar';
                } else if (pm25Value <= 75) {
                    infoHeader.style.backgroundColor = '#ff9b57';
                    smileIcon.src = '../IMG/newCt/IconeLaranja.png';
                    infoTitle.textContent = 'Ruim';
                    pmIcon.src = '../IMG/newCt/mLaranja.png';
                    maskIcon.src = '../IMG/newCt/BLaranja.png';
                    exerciseIcon.src = '../IMG/newCt/MascLaranja.png';
                    maskText.textContent = 'Evite exercícios ao ar livre';
                    exerciseText.textContent = 'Recomendado uso de máscara';
                } else if (pm25Value <= 125) {
                    infoHeader.style.backgroundColor = '#fe6a69';
                    smileIcon.src = '../IMG/newCt/IconeVermelho.png';
                    infoTitle.textContent = 'Muito Ruim';
                    pmIcon.src = '../IMG/newCt/mVermelho.png';
                    exerciseIcon.src = '../IMG/newCt/MascVermelha.png';
                    maskIcon.src = '../IMG/newCt/Bvermelha.png';
                    maskText.textContent = 'Evite exercícios ao ar livre';
                    exerciseText.textContent = 'Use máscara ao sair de casa';
                } else {
                    infoHeader.style.backgroundColor = '#ca5ce0';
                    smileIcon.src = '../IMG/newCt/IconeRoxo.png';
                    infoTitle.textContent = 'Péssimo';
                    pmIcon.src = '../IMG/newCt/mRoxo.png';
                    exerciseIcon.src = '../IMG/newCt/MascRoxa.png';
                    maskIcon.src = '../IMG/newCt/IconRoxo.png';
                    maskText.textContent = 'Toda a população deve ficar alerta aos riscos à saúde';
                    exerciseText.textContent = 'Uso de máscara obrigatório';
                }
            } else {
                pm25Display.textContent = 'N/A';
            }
            // Exibir a data e hora do último registro
            if (data.timestamp) {
                timestampDisplay.textContent = `Última atualização: ${data.timestamp}`;
            } else {
                timestampDisplay.textContent = 'Última atualização: N/A';
            }
    
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            pm25Display.textContent = 'Erro';
            timestampDisplay.textContent = 'Última atualização: N/A';
        }
    });
});
