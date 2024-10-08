document.addEventListener('DOMContentLoaded', function () {
    let chart, chartLine;

    const chartLineElement = document.querySelector("#chart-line");
    const chartElement = document.querySelector("#chart-line2");

    if (chartLineElement && chartElement) {
        initializeEmptyCharts();
        document.getElementById('dateForm3').addEventListener('submit', fetchData);
    } 

    async function fetchData(event) {
        event.preventDefault();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const moqaID = document.getElementById('monitor-select-main').value;

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
            const startTimestamp = new Date(startDate).getTime();
            const endTimestamp = new Date(endDate).getTime();

            renderCharts(data.documents, startTimestamp, endTimestamp);
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
                }
            },
            colors: ['#000000', '#979797'], 
            stroke: {
                width: [2, 4],
                curve: ['straight', 'smooth']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.91,
                    opacityTo: 0.1
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
            },
            dropShadow: {
                enabled: false
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
            colors: ['#000000', '#979797'], 
            stroke: {
                width: [2, 4],
                curve: ['straight', 'smooth'] 
            },
            fill: {
                opacity: [1, 0.75]
            },
            markers: {
                size: 0
            },
            yaxis: [
                {
                    seriesName: 'PM2.5',
                    axisTicks: {
                        show: true,
                        color: '#000000'
                    },
                    axisBorder: {
                        show: true,
                        color: '#000000'
                    },
                    labels: {
                        style: {
                            colors: '#000000'
                        }
                    },
                    title: {
                        text: "PM2.5",
                        style: {
                            color: '#000000'
                        }
                    }
                },
                {
                    seriesName: 'PM10',
                    opposite: true,
                    axisTicks: {
                        show: true,
                        color: '#979797'
                    },
                    axisBorder: {
                        show: true,
                        color: '#979797'
                    },
                    labels: {
                        style: {
                            colors: '#979797'
                        }
                    },
                    title: {
                        text: "PM10",
                        style: {
                            color: '#979797'
                        }
                    }
                }
            ],
            xaxis: {
                type: 'datetime'
            }
        };

        try {
            chartLine = new ApexCharts(chartLineElement, optionsLine);
            chart = new ApexCharts(chartElement, options);
    
            chartLine.render();
            chart.render();
    
            setTimeout(() => {
                if (chart) chart.render();
                if (chartLine) chartLine.render();
            }, 1000); 
    
            window.addEventListener('resize', () => {
                if (chart) chart.render();
                if (chartLine) chartLine.render();
            });
        } catch (error) {
            console.error('Erro ao inicializar gráficos:', error);
        }
    }

    function renderCharts(data, startTimestamp, endTimestamp) {
        if (!data || data.length === 0) {
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

            const oneMonth = 30 * 24 * 60 * 60 * 1000;
            const initialSelectionMin = startTimestamp;
            const initialSelectionMax = Math.min(startTimestamp + oneMonth, endTimestamp);

            chartLine.updateOptions({
                chart: {
                    selection: {
                        xaxis: {
                            min: initialSelectionMin,
                            max: initialSelectionMax
                        }
                    }
                }
            });
        }
    }
});
