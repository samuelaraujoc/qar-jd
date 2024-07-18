document.addEventListener('DOMContentLoaded', async function () {
    const chartContainer = document.querySelector('#chart4');

    try {
        const year = new Date().getFullYear();
        const response = await fetch(`/dados03/dados-anuais?year=${year}`);
        const data = await response.json();

        const pollutantsData = data.documents.map(d => ({
            x: new Date(d.Timestamp),
            y: d.avgPM25,
            fillColor: getColorForPM25(d.avgPM25)
        }));

        const options = {
            chart: {
                type: 'line',
                height: 350
            },
            series: [{
                name: 'PM2.5',
                data: pollutantsData
            }],
            xaxis: {
                type: 'datetime',
                labels: {
                    formatter: function (value) {
                        const date = new Date(value);
                        const dayOfYear = Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / 86400000);
                        return `${dayOfYear}`;
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'µg/m³'
                }
            },
            annotations: {
                yaxis: [
                    {
                        y: 25,
                        borderColor: '#52ae32',
                        label: {
                            borderColor: '#52ae32',
                            style: {
                                color: '#fff',
                                background: '#52ae32'
                            },
                            text: 'Boa'
                        }
                    },
                    {
                        y: 50,
                        borderColor: '#f1dd00',
                        label: {
                            borderColor: '#f1dd00',
                            style: {
                                color: '#fff',
                                background: '#f1dd00'
                            },
                            text: 'Moderada'
                        }
                    },
                    {
                        y: 75,
                        borderColor: '#ef7d00',
                        label: {
                            borderColor: '#ef7d00',
                            style: {
                                color: '#fff',
                                background: '#ef7d00'
                            },
                            text: 'Ruim'
                        }
                    },
                    {
                        y: 125,
                        borderColor: '#d51224',
                        label: {
                            borderColor: '#d51224',
                            style: {
                                color: '#fff',
                                background: '#d51224'
                            },
                            text: 'Muito Ruim'
                        }
                    }
                ]
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
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
});
