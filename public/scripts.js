document.getElementById('dateForm').addEventListener('submit', fetchData);

async function fetchData(event) {
    event.preventDefault();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const query = `startDate=${startDate}&endDate=${endDate}`;

    try {
        const response = await fetch(`/dados?${query}`);
        
        // Verifique se o conteúdo é JSON antes de tentar analisá-lo
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('A resposta não é JSON');
        }

        //Verificando Retorno de dados (console.log)
        const data = await response.json();
        console.log('Dados recebidos:', data);
        renderChart(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
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

    const chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
}