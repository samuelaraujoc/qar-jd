import locations from './locations.js';
import {IconBoa,IconModerado,IconRuim,IconMuitoRuim,IconSemPonto,IconPessima} from './icons.js';
var map;
function emojipm25(valor){
    if(valor>=0 && valor<=25){return [
        "Boa",
        IconBoa, 
        '<img class="imgIcon" src="../img/Boa.png"  width:"2px" height:"2px"></img>',
        '<img class="imgIcon" src="../img/designSystem2/bike-green.png" width:"6px" margin-bottom:"15px" height:"6px"></img>',
        '<img class="imgIcon" src="../img/designSystem2/monitor-good.png" width:"6px" margin-bottom:"15px" height:"6px"></img>',
        ['Atividades ao ar livre','Exercícios Físicos'],
        ['#58d68d','#229954']]
    }
    else if(valor>25 && valor<=50){return [
        "Moderado",
        IconModerado,
        '<img class="imgIcon" src="../img/Moderada.png" width:"2px" height:"2px"></img>',
        '<img class="imgIcon" src="../img/designSystem2/monitor-moderate.png" width:"6px" height:"6px"></img>',
        '<img class="imgIcon" src="../img/designSystem2/mask-moderate.png" width:"6px" height:"6px"></img>',
        ['Grupos de risco devem evitar atividades ao ar livre ','Grupos de risco devem usar máscara'],
        ['#f4d03f','#d4ac0d']]}
    else if(valor>50 && valor<=75){return [
        "Ruim",
        IconRuim,
        '<img class="imgIcon" src="../img/ruim.png" width:"2px" height:"2px"></img>', 
        '<img class="imgIcon" src="../img/designSystem2/emoji-bad.png" width:"2px" height:"2px"></img>',
        '<img class="imgIcon" src="../img/designSystem2/mask-bad.png" width:"2px" height:"2px"></img>',
        ['Grupos de risco devem evitar atividades ao ar livre ','População em geral deve usar máscara e evitar exposição a outros fatores de risco'],
        ['#ff8531','#d35400']]}
    else if(valor>75 && valor<=125){return [
        "Muito Ruim",
        IconMuitoRuim,
        '<img class="imgIcon" src="../img/Muito-ruim.png" width:"2px" height:"2px"></img>',
        '<img class="imgIcon" src="../img/designSystem2/emoji-very-bad.png" width:"3px" height:"3px"></img>',
        '<img class="imgIcon" src="../img/designSystem2/emoji-very-bad.png" width:"3px" height:"3px"></img>',
        ['Grupos de risco devem ficar em casa','Janelas fechadas e sistemas de refrigeração e circulação do ar são recomendados'],
        ['#ff6969','#f91c1c']]}
    else{
        if(valor>125 && valor<=300){return [
            "Péssima",
            IconPessima,
            '<img class="imgIcon" src="../img/pessima.png" width:"2px" height:"2px"></img>',
            '<img class="imgIcon" src="../img/designSystem2/emoji-hazard.png" width:"3px" height:"3px"></img>',
            '<img class="imgIcon" src="../img/designSystem2/mask-hazard.png" width:"3px" height:"3px"></img>',
            ['Toda a população em geral deve evitar qualquer tipo de atividade ao ar livre','Janelas fechadas e sistemas de refrigeração e circulação do ar são recomendados'],
            ['#df4cff','#b800e1']]}
    }
}
function emojipm10(valor){
    if(valor>=0 && valor<=50){return ["Boa",IconBoa, '<img class="imgIcon" src="../img/Boa.png"  width:"2px" height:"2px"></img>']}
    else if(valor>50 && valor<=100){return ["Moderado",IconModerado,'<img class="imgIcon" src="../img/Moderada.png" width:"2px" height:"2px"></img>']}
    else if(valor>100 && valor<=150){return ["Ruim",IconRuim, '<img class="imgIcon" src="../img/ruim.png" width:"2px" height:"2px"></img>']}
    else if(valor>150 && valor<=250){return ["Muito Ruim",IconMuitoRuim, '<img class="imgIcon" src="../img/Muito-ruim.png" width:"2px" height:"2px"></img>']}
    else{
        if(valor>250 && valor<=600){return ["Péssima",IconMuitoRuim, '<img class="imgIcon" src="../img/pessima.png" width:"2px" height:"2px"></img>']}
    }
}
//const singleDate = '2023-12-12T14:00:00Z';
const singleDate = '12/19/2023'
var value = await pesquisa(singleDate);

function sucess(pos) {
 
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;

    if (map === undefined) {
        map = L.map('map',{
            minZoom: 12,
            maxZoom: 15
        }).setView([latitude, longitude],12);
    } else {
        map.remove();
        map = L.map('map',{
            minZoom: 12,
            maxZoom: 15
        }).setView([latitude, longitude],12);
    }
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


function separarDadosMonitores(queryResult){
    for (let x=0; x<locations.length; x++){
        for (let y=0; y<queryResult.length; y++){
            if (queryResult[y]._id.moqa == locations[x].id){
                locations[x].dados.push(queryResult[y]);
            }
        }
    }
}
separarDadosMonitores(value);
//console.log(locations);

function fetchData() {

    locations.forEach(location => {
        let pm25,pm10,hum,temp;
        if (location.dados.length != 0){
            pm25 = location.dados[0].avgPM25;
            pm10 = location.dados[0].avgPM10;
            hum  = location.dados[0].avgHum;
            temp = location.dados[0].avgExtTemp;
            if (location.id == "DD56F0"){
                pm25 = 5.5;
            }
            else if (location.id == "DCB604"){
                pm25 = 80;
            }
            else if (location.id == "E4C790"){
                pm25=40;
            }
            else if (location.id == "A5BBFC"){
                pm25 = 231;
            }
            else if (location.id == "A70044"){
                pm25 = 53;
            }
            
            }else{
                pm25 =0;
                pm10 =0;
                hum =0;
                temp =0;
                
                if (location.id == "DD56F0"){
                    pm25 = 5.5;
                }
                else if (location.id == "DCB604"){
                    pm25 = 80;
                }
                else if (location.id == "E4C790"){
                    pm25=40;
                }
                else if (location.id == "A5BBFC"){
                    pm25 = 231;
                }
                else if (location.id == "A70044"){
                    pm25 = 53;
                }
                
            }
       
        

        let iconTemp= '<img class="imgIcon" src="../img/thermometer.png"></img>';
        let iconHum = '<img class="imgIcon" src="../img/humidity.png"></img>';
        let popUpInativo = `
                ${location.name}
                <h5 style="font-size:13px;color:black;">${location.address}</h5>
                
                <div class="newPopUp" style="background-color:grey  !important;"><h5 style="margin-left:10px;font-size:16px; color:black">QAR Fortaleza</h5>
                
                <div class="line" style="display:inline-flex"><div class="square" style="margin-left:10px;width:50px;height:50px;background-color:black;padding:15px;border-radius:10%;font-size:13px;"> - </div><div style="margin-top:6%;margin-left:15%"> Inativo </div></div><br>
                </div>
                <hr>
                <span style="color:black;font-size:17px">Dados do Monitor</span><br>

                <span style="height:10px;width:50px;font-size:12px">${iconTemp} - ${iconHum} - </span>
                <br>
                <span style="font-size:12px">PM25: - ug/m3</span>
                <br>
                <span style="font-size:12px">PM10: - ug/m3</span>
                <hr>
                `
                // id style <br><h5 style="font-size:17px;color:grey">${location.id}</h5>
                var popUp = `
                ${location.name}
                <h5 style="font-size:13px;color:black;">${location.address}</h5>
                
                <div class="newPopUp" style="background-color:${emojipm25(pm25)[6][0]}  !important;"><h5 style="margin-left:10px;font-size:16px; color:black;font-weight:bold">QAR Fortaleza</h5>
                
                <div class="line" style="display:inline-flex; width:100px"><div class="square" style="margin-left:10px;width:50px;height:50px;background-color:${emojipm25(pm25)[6][1]};padding:15px;border-radius:10%;font-size:13px;">${pm25}</div><div style="margin-top:6%;margin-left:10%">${emojipm25(pm25)[0]}</div></div><br>
                </div>
                <hr>
                <span style="color:${emojipm25(pm25)[6][1]};font-size:17px">Dados do Monitor</span><br>

                <span style="height:10px;width:50px;font-size:12px">${iconTemp} ${temp} ${iconHum} ${hum}</span>
                <br>
                <span style="font-size:12px">PM25: ${pm25} ug/m3</span>
                <br>
                <span style="font-size:12px">PM10: ${pm10} ug/m3</span>
                <hr>
                <span style="color:${emojipm25(pm25)[6][1]};font-size:17px">Recomendações a Saúde</span><br>
                
                <span style="display:inline-block"><div style="font-size:14px">${emojipm25(pm25)[3]} ${emojipm25(pm25)[5][0]}</div></span>
                 
                <span style="display:inline-block"><div style="font-size:14px">${emojipm25(pm25)[4]} ${emojipm25(pm25)[5][1]}</div></span>
                
                <h3 style="font-size:13px;color:${emojipm25(pm25)[6][0]};margin-top:15px;font-weight:bold"><a href="../analyzedata.html">Clique Para Mais Detalhes</a></h3>
                `
                
                

                
               
        var customOptions =
        {
            'font-size': '1rem',
            'border':'5px solid black',
            'margin':'0px',
            'background-color': 'red',
            'className' : 'popupCustom'
        }
        let ids = ["DD56F0","DCB604","E4C790","A5BBFC","A70044"];
        if(location.dados.length == 0 && location.id != "DD56F0"  && location.id != "DCB604" && location.id != "E4C790" && location.id != "A5BBFC" && location.id != "A70044"){
            L.marker([location.coord.lat, location.coord.lng], { title: location.name, icon: IconSemPonto,id: location.id })
            .bindPopup(popUpInativo, customOptions)
            .addTo(map);
        }else{
            L.marker([location.coord.lat, location.coord.lng], { title: location.name, icon: emojipm25(pm25)[1],id: location.id })
            .bindPopup(popUp,customOptions)
            .addTo(map).on('click',onMapClick);
        }
        function onMapClick(e) {
            console.log(e.target.options.id);
            let monitorNome = e.target.options.id;
            localStorage.setItem('monitorID',monitorNome);
        }
    });   
    
}

fetchData();


}


async function pesquisa(date){
    const query = `singleDate=${date}`;
    try {
        const response = await fetch(`/dadosMapa?${query}`);

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('A resposta não é JSON');
        }

        const data = await response.json();
    
        return data
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function error(err) {
    if (err.code === err.PERMISSION_DENIED) {
        alert("Permissão de localização negada. Por favor, permita o acesso à localização nas configurações do navegador.");
    } else if (err.code === err.POSITION_UNAVAILABLE) {
        alert("A posição não está disponível.");
    } else if (err.code === err.TIMEOUT) {
        alert("A requisição de localização expirou.");
    } else {
        alert("Erro desconhecido.");
    }
    console.log(err);
}
    
// Obtém a posição atual
navigator.geolocation.getCurrentPosition(sucess, error);

