document.addEventListener('DOMContentLoaded', function () {
    const chartPM25Container = document.querySelector('#chart2');
    const chartPM10Container = document.querySelector('#chart3');
    let chartPM25, chartPM10;

    initializeEmptyCharts();

    document.getElementById('dateForm2').addEventListener('submit', fetchData);

    async function fetchData(event) {
        event.preventDefault();
        const singleDate2 = document.getElementById('singleDate2').value;
        const moqaID = document.getElementById('another-monitor-select').value;

        // Verifica se a data foi inserida
        if (!singleDate2) {
            alert('Por favor, selecione uma data.');
            return;
        }

        const query = `singleDate2=${singleDate2}&moqaID=${moqaID}`;

        clearPreviousData();

        try {
            const response = await fetch(`/dados2?${query}`);

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('A resposta não é JSON');
            }

            const data = await response.json();
            console.log('Dados recebidos:', data.documents);
            renderCharts(data.documents);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    function initializeEmptyCharts() {
        const optionsPM25 = {
            chart: {
                type: 'heatmap',
                height: 350
            },
            series: [],
            xaxis: {
                type: 'category',
                categories: []
            },
            colors: ["#008FFB"]
        };

        const optionsPM10 = {
            chart: {
                type: 'heatmap',
                height: 350
            },
            series: [],
            xaxis: {
                type: 'category',
                categories: []
            },
            colors: ["#00E396"]
        };

        chartPM25 = new ApexCharts(chartPM25Container, optionsPM25);
        chartPM10 = new ApexCharts(chartPM10Container, optionsPM10);

        chartPM25.render();
        chartPM10.render();
    }

    function clearPreviousData() {
        console.clear();

        if (chartPM25) {
            chartPM25.destroy();
        }
        if (chartPM10) {
            chartPM10.destroy();
        }
    }

    function renderCharts(data) {
        const categories = data.map(d => d.date);

        const seriesPM25 = [{
            name: 'PM2.5',
            data: data.map(d => ({ x: d.date, y: d.avgPM25 }))
        }];

        const seriesPM10 = [{
            name: 'PM10',
            data: data.map(d => ({ x: d.date, y: d.avgPM10 }))
        }];

        const optionsPM25 = {
            chart: {
                type: 'heatmap',
                height: 350
            },
            series: seriesPM25,
            xaxis: {
                type: 'category',
                categories: categories
            },
            colors: ["#008FFB"]
        };

        const optionsPM10 = {
            chart: {
                type: 'heatmap',
                height: 350
            },
            series: seriesPM10,
            xaxis: {
                type: 'category',
                categories: categories
            },
            colors: ["#00E396"]
        };

        chartPM25 = new ApexCharts(chartPM25Container, optionsPM25);
        chartPM10 = new ApexCharts(chartPM10Container, optionsPM10);

        chartPM25.render();
        chartPM10.render();
    }
});
