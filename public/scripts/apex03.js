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
            const startTimestamp = new Date(startDate).getTime();
            const endTimestamp = new Date(endDate).getTime();

            renderCharts(data.documents, startTimestamp, endTimestamp);
        } catch (error) {
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
                height: 230
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
                            colors: '#008FFB'
                        }
                    },
                    title: {
                        text: "PM2.5",
                        style: {
                            color: '#008FFB'
                        }
                    }
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
        } catch (error) {
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

            // Calcula o intervalo de um mês dentro do intervalo total
            const oneMonth = 30 * 24 * 60 * 60 * 1000; // Aproximadamente um mês em milissegundos
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
