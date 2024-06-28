document.addEventListener('DOMContentLoaded', function() {
    const chartContainer = document.querySelector('#chart');
    let chart; // Variável para armazenar a instância do gráfico

    // Inicializar o gráfico vazio ao carregar a página
    initializeEmptyChart();

    // Adicionar evento de submit ao formulário
    document.getElementById('dateForm').addEventListener('submit', fetchData);

    async function fetchData(event) {
        event.preventDefault();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const moqaID = document.getElementById('monitor-select').value;
        const query = `startDate=${startDate}&endDate=${endDate}&moqaID=${moqaID}`;

        // Limpar dados anteriores e gráfico
        clearPreviousData();

        try {
            const response = await fetch(`/dados?${query}`);
            
            // Verificar se o conteúdo é JSON antes de tentar analisá-lo
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('A resposta não é JSON');
            }

            const data = await response.json();
            console.log('Dados recebidos:', data.documents); // Acesse os documentos dentro do objeto recebido
            renderChart(data.documents); // Passe apenas os documentos para o renderChart
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    function initializeEmptyChart() {
        const options = {
            chart: {
                type: 'line',
                height: 350
            },
            series: [],
            xaxis: {
                categories: []
            }
        };

        chart = new ApexCharts(chartContainer, options);
        chart.render();
    }

    function clearPreviousData() {
        // Limpar console
        console.clear();

        // Limpar gráfico existente
        if (chart) {
            chart.destroy(); // Destroi a instância do gráfico existente
        }
    }

    function renderChart(data) {
        const options = {
            chart: {
                type: 'line',
                height: 350
            },
            series: [{
                name: 'PM2.5',
                data: data.map(d => d.pm25)
            }, {
                name: 'PM10',
                data: data.map(d => d.pm10)
            }, {
                name: 'Humidade',
                data: data.map(d => d.hum)
            }, {
                name: 'Temperatura Externa',
                data: data.map(d => d.extTemp)
            }],
            xaxis: {
                categories: data.map(d => new Date(d.Timestamp * 1000).toLocaleString())
            }
        };

        chart = new ApexCharts(chartContainer, options);
        chart.render();
    }
});
