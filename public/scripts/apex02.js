document.addEventListener("DOMContentLoaded", function() {
    // Opções do primeiro gráfico Heatmap
    var options1 = {
        series: [{
                name: 'Metric1',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            },
            {
                name: 'Metric2',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            },
            {
                name: 'Metric3',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            }
        ],
        chart: {
            height: 350,
            type: 'heatmap',
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                            from: 0,
                            to: 25,
                            color: '#008FFB'
                        },
                        {
                            from: 26,
                            to: 50,
                            color: '#00E396'
                        },
                        {
                            from: 51,
                            to: 75,
                            color: '#FEB019'
                        },
                        {
                            from: 76,
                            to: 100,
                            color: '#FF4560'
                        }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'HeatMap Chart 1 (Color Range)'
        },
    };

    var options2 = {
        series: [{
                name: 'Metric4',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            },
            {
                name: 'Metric5',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            },
            {
                name: 'Metric6',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            }
        ],
        chart: {
            height: 350,
            type: 'heatmap',
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                            from: 0,
                            to: 25,
                            color: '#008FFB'
                        },
                        {
                            from: 26,
                            to: 50,
                            color: '#00E396'
                        },
                        {
                            from: 51,
                            to: 75,
                            color: '#FEB019'
                        },
                        {
                            from: 76,
                            to: 100,
                            color: '#FF4560'
                        }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'HeatMap Chart 2 (Color Range)'
        },
    };

    var chart1 = new ApexCharts(document.querySelector("#chart2"), options1);
    var chart2 = new ApexCharts(document.querySelector("#chart3"), options2);
    chart1.render();
    chart2.render();

    document.getElementById('dateForm2').addEventListener('submit', function(event) {
        event.preventDefault(); 
        fetchData2(); 
    });

    async function fetchData2() {
        const singleDate2 = document.getElementById('singleDate2').value;
        const monitorSelect = document.getElementById('another-monitor-select').value;
        const query = `singleDate2=${singleDate2}&monitorSelect=${monitorSelect}`;


        try {
            const data = await fetch(`/dados2?${query}`).then(response => response.json());

            console.log('Dados recebidos:', data);
            renderCharts2(data); 
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    function renderCharts2(data) {
        chart2.updateSeries([{
                name: 'Metric4',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            },
            {
                name: 'Metric5',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            },
            {
                name: 'Metric6',
                data: generateHeatmapData(18, { min: 0, max: 90 })
            }
        ]);
    }

    function generateHeatmapData(count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = 'W' + (i + 1).toString();
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
    }
});
