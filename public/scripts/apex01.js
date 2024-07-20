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
                        return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }
                }
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1);
                }
            },
            colors: ['#2c3339', '#747474'],
            legend: {
                fontSize: '14px',
                fontWeight: 'bold',
                labels: {
                    colors: ['#000'], 
                },
            }
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
                        return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }
                }
            },
            colors: ['#0000FF', '#FF0000'],
            legend: {
                fontSize: '14px',
                fontWeight: 'bold',
                labels: {
                    colors: ['#000'],
                },
            }
        };

        chartPollutants = new ApexCharts(chartPollutantsContainer, optionsPollutants);
        chartMeteorological = new ApexCharts(chartMeteorologicalContainer, optionsMeteorological);

        chartPollutants.render();
        chartMeteorological.render();
    }

    function clearPreviousData() {
        if (chartPollutants) {
            chartPollutants.destroy();
        }
        if (chartMeteorological) {
            chartMeteorological.destroy();
        }
    }

    function getColorForPM25(value) {
        if (value <= 25) return '#52ae32';
        if (value <= 50) return '#f1dd00';
        if (value <= 75) return '#ef7d00';
        if (value <= 125) return '#d51224';
        return '#683793';
    }

    function getColorForPM10(value) {
        if (value <= 50) return '#52ae32';
        if (value <= 100) return '#f1dd00';
        if (value <= 150) return '#ef7d00';
        if (value <= 250) return '#d51224';
        return '#683793';
    }

    function renderCharts(data) {
        const categories = data.map(d => `${new Date(d.Timestamp).getHours()}:${String(new Date(d.Timestamp).getMinutes()).padStart(2, '0')}`);

        const seriesPM25 = {
            name: 'PM2.5',
            data: data.map(d => ({
                x: `${new Date(d.Timestamp).getHours()}:${String(new Date(d.Timestamp).getMinutes()).padStart(2, '0')}`,
                y: d.avgPM25,
                fillColor: getColorForPM25(d.avgPM25)
            }))
        };

        const seriesPM10 = {
            name: 'PM10',
            data: data.map(d => ({
                x: `${new Date(d.Timestamp).getHours()}:${String(new Date(d.Timestamp).getMinutes()).padStart(2, '0')}`,
                y: d.avgPM10,
                fillColor: getColorForPM10(d.avgPM10)
            }))
        };

        const optionsPollutants = {
            chart: {
                type: 'bar',
                height: 350
            },
            series: [seriesPM25, seriesPM10],
            xaxis: {
                categories: categories,
                labels: {
                    formatter: function (value) {
                        return value; 
                    }
                }
            },
            plotOptions: {
                bar: {
                    distributed: false,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1);
                }
            },
            colors: ['#2c3339', '#747474'], 
            legend: {
                fontSize: '14px',
                fontWeight: 'bold',
                labels: {
                    colors: ['#000'],
                },
            }
        };

        const optionsMeteorological = {
            chart: {
                type: 'line',
                height: 350
            },
            series: [{
                name: 'Humidade',
                data: data.map(d => ({
                    x: `${new Date(d.Timestamp).getHours()}:${String(new Date(d.Timestamp).getMinutes()).padStart(2, '0')}`,
                    y: d.avgHum
                }))
            }, {
                name: 'Temperatura Externa',
                data: data.map(d => ({
                    x: `${new Date(d.Timestamp).getHours()}:${String(new Date(d.Timestamp).getMinutes()).padStart(2, '0')}`,
                    y: d.avgExtTemp
                }))
            }],
            xaxis: {
                categories: categories,
                labels: {
                    formatter: function (value) {
                        return value; 
                    }
                }
            },
            colors: ['#0000FF', '#FF0000'],
            legend: {
                fontSize: '14px',
                fontWeight: 'bold',
                labels: {
                    colors: ['#000'], 
                },
            }
        };

        chartPollutants = new ApexCharts(chartPollutantsContainer, optionsPollutants);
        chartMeteorological = new ApexCharts(chartMeteorologicalContainer, optionsMeteorological);

        chartPollutants.render();
        chartMeteorological.render();
    }
});
