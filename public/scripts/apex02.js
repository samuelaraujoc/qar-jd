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
                type: 'bar',
                height: 350
            },
            series: [],
            xaxis: {
                type: 'category',
                categories: []
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [],
            title: {
                text: 'Gráfico de PM2.5',
                align: 'center',
                style: {
                    fontSize: '16px'
                }
            }
        };

        const optionsPM10 = {
            chart: {
                type: 'bar',
                height: 350
            },
            series: [],
            xaxis: {
                type: 'category',
                categories: []
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [],
            title: {
                text: 'Gráfico de PM10',
                align: 'center',
                style: {
                    fontSize: '16px'
                }
            }
        };

        chartPM25 = new ApexCharts(chartPM25Container, optionsPM25);
        chartPM10 = new ApexCharts(chartPM10Container, optionsPM10);

        chartPM25.render();
        chartPM10.render();
    }

    function clearPreviousData() {
        if (chartPM25) {
            chartPM25.destroy();
        }
        if (chartPM10) {
            chartPM10.destroy();
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

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    }

    function renderCharts(data) {
        const categories = data.map(d => formatDate(d.date));

        const seriesPM25 = [{
            name: 'PM2.5',
            data: data.map(d => ({ x: formatDate(d.date), y: d.avgPM25 }))
        }];

        const seriesPM10 = [{
            name: 'PM10',
            data: data.map(d => ({ x: formatDate(d.date), y: d.avgPM10 }))
        }];

        const colorsPM25 = data.map(d => getColorForPM25(d.avgPM25));
        const colorsPM10 = data.map(d => getColorForPM10(d.avgPM10));

        const optionsPM25 = {
            chart: {
                type: 'bar',
                height: 350
            },
            series: seriesPM25,
            xaxis: {
                type: 'category',
                categories: categories
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: colorsPM25,
            title: {
                text: 'Gráfico PM2.5',
                align: 'center',
                style: {
                    fontSize: '16px'
                }
            }
        };

        const optionsPM10 = {
            chart: {
                type: 'bar',
                height: 350
            },
            series: seriesPM10,
            xaxis: {
                type: 'category',
                categories: categories
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: colorsPM10,
            title: {
                text: 'Gráfico PM10',
                align: 'center',
                style: {
                    fontSize: '16px'
                }
            }
        };

        chartPM25 = new ApexCharts(chartPM25Container, optionsPM25);
        chartPM10 = new ApexCharts(chartPM10Container, optionsPM10);

        chartPM25.render();
        chartPM10.render();
    }
});
