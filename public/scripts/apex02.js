document.addEventListener("DOMContentLoaded", function() {
    // Opções do primeiro gráfico
    var options1 = {
        series: [{
            name: 'Metric1',
            data: generateData(18, { min: 0, max: 90 })
        },
        {
            name: 'Metric2',
            data: generateData(18, { min: 0, max: 90 })
        },
        {
            name: 'Metric3',
            data: generateData(18, { min: 0, max: 90 })
        }],
        chart: {
            height: 350,
            type: 'heatmap',
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#008FFB"],
        title: {
            text: 'HeatMap Chart 1 (Single color)'
        },
    };

    // Opções do segundo gráfico
    var options2 = {
        series: [{
            name: 'Metric4',
            data: generateData(18, { min: 0, max: 90 })
        },
        {
            name: 'Metric5',
            data: generateData(18, { min: 0, max: 90 })
        },
        {
            name: 'Metric6',
            data: generateData(18, { min: 0, max: 90 })
        }],
        chart: {
            height: 350,
            type: 'heatmap',
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#FF5733"],
        title: {
            text: 'HeatMap Chart 2 (Single color)'
        },
    };

    // Renderização dos gráficos
    var chart1 = new ApexCharts(document.querySelector("#chart2"), options1);
    var chart2 = new ApexCharts(document.querySelector("#chart3"), options2);
    chart1.render();
    chart2.render();

    // Função para gerar dados fictícios
    function generateData(count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = 'W' + (i + 1).toString();
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push({ x: x, y: y });
            i++;
        }
        return series;
    }
});