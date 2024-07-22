document.addEventListener('DOMContentLoaded', function () {
    let chart, chartLine;

    // Inicializa os gráficos vazios
    initializeEmptyCharts();

    document.getElementById('dateForm3').addEventListener('submit', fetchData);

    async function fetchData(event) {
        event.preventDefault();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const moqaID = document.getElementById('another-monitor-select3').value;

        if (!startDate || !endDate) {
            alert('Por favor, selecione um intervalo de datas.');
            return;
        }

        const query = `startDate=${startDate}&endDate=${endDate}&moqaID=${moqaID}`;

        try {
            const response = await fetch(`/dados3?${query}`);
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
        const optionsLine = {
            series: [],
            chart: {
                id: 'chart1',
                height: 130,
                type: 'area',
                brush: {
                    target: 'chart2',
                    enabled: true
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: new Date().getTime(),
                        max: new Date().getTime()
                    }
                },
            },
            colors: ['#008FFB', '#00E396'],
            stroke: {
                width: [1, 3],
                curve: ['straight', 'monotoneCubic']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.91,
                    opacityTo: 0.1,
                }
            },
            xaxis: {
                type: 'datetime',
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                max: 100,
                tickAmount: 2
            }
        };

        const options = {
            series: [],
            chart: {
                id: 'chart2',
                type: 'line',
                height: 230,
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                toolbar: {
                    autoSelected: 'pan',
                    show: false
                }
            },
            colors: ['#008FFB', '#00E396'],
            stroke: {
                width: 3
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [2, 6],
                curve: ['straight', 'monotoneCubic']
            },
            fill: {
                opacity: [1, 0.75],
            },
            markers: {
                size: 0
            },
            yaxis: [
                {
                    seriesName: 'PM2.5',
                    axisTicks: {
                        show: true,
                        color: '#008FFB'
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB'
                    },
                    labels: {
                        style: {
                            colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "PM2.5",
                        style: {
                            color: '#008FFB'
                        }
                    },
                },
                {
                    seriesName: 'PM10',
                    opposite: true,
                    axisTicks: {
                        show: true,
                        color: '#00E396'
                    },
                    axisBorder: {
                        show: true,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            colors: '#00E396'
                        }
                    },
                    title: {
                        text: "PM10",
                        style: {
                            color: '#00E396'
                        }
                    },
                }
            ],
            xaxis: {
                type: 'datetime'
            }
        };

        // Verifique se os elementos existem antes de inicializar os gráficos
        const chartLineElement = document.querySelector("#chart-line");
        const chartElement = document.querySelector("#chart-line2");

        if (chartLineElement && chartElement) {
            chartLine = new ApexCharts(chartLineElement, optionsLine);
            chart = new ApexCharts(chartElement, options);

            chartLine.render().catch(error => console.error('Erro ao renderizar chartLine:', error));
            chart.render().catch(error => console.error('Erro ao renderizar chart:', error));
        } else {
            console.error('Elementos #chart-line ou #chart-line2 não encontrados no DOM.');
        }
    }

    function clearPreviousData() {
        if (chart) {
            chart.destroy();
        }
        if (chartLine) {
            chartLine.destroy();
        }
    }

    function renderCharts(data) {
        if (!data || data.length === 0) {
            console.error('Nenhum dado recebido para renderizar os gráficos.');
            return;
        }

        const seriesPM25 = {
            name: 'PM2.5',
            data: data.map(d => [new Date(d.Timestamp).getTime(), d.avgPM25])
        };

        const seriesPM10 = {
            name: 'PM10',
            data: data.map(d => [new Date(d.Timestamp).getTime(), d.avgPM10])
        };

        if (chart && chartLine) {
            chart.updateSeries([seriesPM25, seriesPM10]);
            chartLine.updateSeries([seriesPM25, seriesPM10]);
        } else {
            console.error('Os gráficos não foram inicializados corretamente.');
        }
    }
});
