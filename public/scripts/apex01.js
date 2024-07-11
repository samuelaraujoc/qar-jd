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
                type: 'bar', // Mudança para gráfico de barras
                height: 350
            },
            series: [],
            xaxis: {
                categories: []
            }
        };

        const optionsMeteorological = {
            chart: {
                type: 'bar', // Mudança para gráfico de barras
                height: 350
            },
            series: [],
            xaxis: {
                categories: []
            }
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
                type: 'bar', // Mudança para gráfico de barras
                height: 350
            },
            /*colors: [
                function({ value, seriesIndex, w}) {
                  if (0 <= value && value<=25) {
                    //GREEN
                    return '#009900'
                    
                  }else if(25<value && value<=50) {
                    //YELLOW
                    return '#CCCC00'
                    
                  }else if(50<value && value<=75){
                    //ORANGE
                    return '#F8000'
                    
                  }else if(75<value && value<=125){
                    //RED
                    return '#CC0000'
                    
                  }else{
                    //PURPLE
                    return '#6600CC'
                  }
                },
                function({ value, seriesIndex, w }) {
                    if (0 <= value && value<=50) {
                        return '#009900'
                      //GREEN
                    } else if(50<value && value<=100) {
                        return '#CCCC00'
                      //YELLOW
                    }else if(100<value && value<=150){
                        return '#F8000'
                      //ORANGE
                    }else if(150<value && value<=250){
                        return '#CC0000'
                      //RED
                    }else{
                        return '#6600CC'
                      //PURPLE
                    }
                  }
            ],*/
            series: [{
                name: 'PM2.5',
                data: data.map(d => d.avgPM25)
            }, {
                name: 'PM10',
                data: data.map(d => d.avgPM10)
            }],
            xaxis: {
                categories: data.map(d => new Date(d.Timestamp).toLocaleString())
            }
        };

        const optionsMeteorological = {
            chart: {
                type: 'bar', // Mudança para gráfico de barras
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
                categories: data.map(d => new Date(d.Timestamp).toLocaleString())
            }
        };

        chartPollutants = new ApexCharts(chartPollutantsContainer, optionsPollutants);
        chartMeteorological = new ApexCharts(chartMeteorologicalContainer, optionsMeteorological);

        chartPollutants.render();
        chartMeteorological.render();
    }
});
