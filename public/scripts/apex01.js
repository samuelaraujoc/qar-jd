document.addEventListener('DOMContentLoaded', function () {
    const chartPollutantsContainer = document.querySelector('#chart-pollutants');
    const chartMeteorologicalContainer = document.querySelector('#chart-meteorological');
    let chartPollutants, chartMeteorological;

    initializeEmptyCharts();

    document.getElementById('dateForm').addEventListener('submit', fetchData);

    async function fetchData(event) {
        event.preventDefault();
        const singleDate = document.getElementById('singleDate').value;
        const moqaID = document.getElementById('monitor-select').value;

        // Verifica se a data foi inserida
        if (!singleDate) {
            alert('Por favor, selecione uma data.');
            return;
        }

        const query = `singleDate=${singleDate}&moqaID=${moqaID}`;

        clearPreviousData();

        try {
            const response = await fetch(`/dados?${query}`);

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
        const optionsPollutants = {
            chart: {
                type: 'bar',
                height: 350
            },
            series: [],
            xaxis: {
                categories: [],
                labels: {
                    formatter: function (value) {
                        const date = new Date(value);
                        return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
                    }
                }
            },
            colors: ['#000000', '#404040']
        };

        const optionsMeteorological = {
            chart: {
                type: 'line',
                height: 350
            },
            series: [],
            xaxis: {
                categories: [],
                labels: {
                    formatter: function (value) {
                        const date = new Date(value);
                        return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
                    }
                }
            },
            colors: ['#0000FF', '#FF0000']
        };

        chartPollutants = new ApexCharts(chartPollutantsContainer, optionsPollutants);
        chartMeteorological = new ApexCharts(chartMeteorologicalContainer, optionsMeteorological);

        chartPollutants.render();
        chartMeteorological.render();
    }

    function clearPreviousData() {
        console.clear();

        if (chartPollutants) {
            chartPollutants.destroy();
        }
        if (chartMeteorological) {
            chartMeteorological.destroy();
        }
    }

    function renderCharts(data) {
        const optionsPollutants = {
            chart: {
                type: 'bar',
                height: 350
            },
            series: [{
                name: 'PM2.5',
                data: data.map(d => d.avgPM25)
            }, {
                name: 'PM10',
                data: data.map(d => d.avgPM10)
            }],
            xaxis: {
                categories: data.map(d => new Date(d.Timestamp).getTime()), // Usar timestamp para melhor formatação
                labels: {
                    formatter: function (value) {
                        const date = new Date(value);
                        return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
                    }
                }
            },
            colors: ['#000000', '#404040']
        };

        const optionsMeteorological = {
            chart: {
                type: 'line',
                height: 350
            },
            series: [{
                name: 'Humidade',
                data: data.map(d => d.avgHum)
            }, {
                name: 'Temperatura Externa',
                data: data.map(d => d.avgExtTemp)
            }],
            xaxis: {
                categories: data.map(d => new Date(d.Timestamp).getTime()), // Usar timestamp para melhor formatação
                labels: {
                    formatter: function (value) {
                        const date = new Date(value);
                        return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
                    }
                }
            },
            colors: ['#0000FF', '#FF0000']
        };

        chartPollutants = new ApexCharts(chartPollutantsContainer, optionsPollutants);
        chartMeteorological = new ApexCharts(chartMeteorologicalContainer, optionsMeteorological);

        chartPollutants.render();
        chartMeteorological.render();
    }
});
