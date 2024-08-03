// import locations from './locations.js'
// import {IconBoa,IconModerado,IconRuim,IconMuitoRuim,IconSemPonto} from './icons.js';
// var map;

// function emoji(valor){
//     if(valor>=0 && valor<=25){return ["Boa",IconBoa, '<img class="imgIcon" src="../img/Boa.png"  width:"2px" height:"2px"></img>']}
//     else if(valor>25 && valor<=50){return ["Moderado",IconModerado,'<img class="imgIcon" src="../img/Moderada.png" width:"2px" height:"2px"></img>']}
//     else if(valor>50 && valor<=75){return ["Ruim",IconRuim, '<img class="imgIcon" src="../img/ruim.png" width:"2px" height:"2px"></img>']}
//     else if(valor>75 && valor<=125){return ["Muito Ruim",IconMuitoRuim, '<img class="imgIcon" src="../img/Muito-ruim.png" width:"2px" height:"2px"></img>']}
//     else{
//         if(valor>125 && valor<=300){return ["Péssima",IconMuitoRuim, '<img class="imgIcon" src="../img/Muito-ruim.png" width:"2px" height:"2px"></img>']}
//     }

// }
// async function sucess(pos) {
 
//     let latitude = pos.coords.latitude;
//     let longitude = pos.coords.longitude;

//     if (map === undefined) {
//         map = L.map('map',{
//             minZoom: 12,
//             maxZoom: 15
//         }).setView([latitude, longitude],12);
//     } else {
//         map.remove();
//         map = L.map('map',{
//             minZoom: 12,
//             maxZoom: 15
//         }).setView([latitude, longitude],12);
//     }
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
   
   
//     await fetchData();
   
// }
// async function fetchData() {
    
//     //const singleDate = '2023-12-12T14:00:00Z';
//     const singleDate = '12/31/2023'
//     //const monCompletos = ["DD56F0"];
//     let i = 0;
//     locations.forEach(async location => {
        
//         let value = await pesquisa(singleDate,location.id)
//         function encontrarMaiorPM25(lista) {
//             if (lista.length === 0) { // Verifica se a lista está vazia
//                 let res = ["none","none","none","none"]
//                 return res; // Ou pode lançar um erro, dependendo da necessidade
//             }
//             let maiorElemento = lista[0].avgPM25; // Assume que o primeiro elemento é o maior
//             let pm10 = lista[0].avgPM10;
//             let hum = lista[0].avgHum;
//             let temp = lista[0].avgExtTemp;
//             let pm25 = maiorElemento;
//             for (let i = 1; i < lista.length; i++) {
//                 if (lista[i].avgPM25 > maiorElemento) {
//                     maiorElemento = lista[i].avgPM25;
//                     pm10 = lista[i].avgPM10;
//                     hum = lista[i].avgHum;
//                     temp = lista[i].avgExtTemp;
//                     pm25 = maiorElemento;
//                 }
//             }
//             let res = [pm25,pm10,hum,temp]
//             return res;
//         }
//         let pm25 = encontrarMaiorPM25(value)[0];
//         let pm10 = encontrarMaiorPM25(value)[1];
//         let hum = encontrarMaiorPM25(value)[2];
//         let temp = encontrarMaiorPM25(value)[3];
//         let iconTemp= '<img class="imgIcon" src="../img/thermometer.png"></img>';
//         let iconHum = '<img class="imgIcon" src="../img/humidity.png"></img>';
//         let popUpInativo = `
//                 ${location.name}
//                 <br><h5 style="font-size:17px;color:grey">${location.id}</h5>
//                 ${location.address}<br>
//                 <br>
//                 <span>${iconTemp} - ${iconHum} -</span>
//                 <table style="width:100%">
//                 <tr>
//                     <th>  Poluentes </th>
//                     <th>  Valores  </th>
//                     <th>  Medida  </th>
//                     <th>  Nível  </ht>
//                 </tr>
//                 <tr>
//                     <td> PM25 </td>
//                     <td> - </td>
//                     <td style="margin-left:20px"> ug/m3 </td>
//                     <td> </td>
//                 </tr>
//                 <tr>
//                     <td>PM10</td>
//                     <td> - </td>
//                     <td>ug/m3</td>
//                     <td> - </td>
//                 </tr>
//                 </table>
//                 <br>
//                 Situação: Inativo
//                 `;
//                 let popUp = `
//                 ${location.name}
//                 <br><h5 style="font-size:17px;color:grey">${location.id}</h5>
//                 ${location.address}<br>
//                 <br>
//                 <span>${iconTemp} ${temp} ${iconHum} ${hum}</span>
//                 <table style="width:100%">
//                 <tr>
//                     <th>  Poluentes </th>
//                     <th>  Valores  </th>
//                     <th>  Medida  </th>
//                     <th>  Nível  </ht>
//                 </tr>
//                 <tr>
//                     <td> PM25 </td>
//                     <td> ${pm25} </td>
//                     <td style="margin-left:20px"> ug/m3 </td>
//                     <td> ${emoji(pm25)[2]}
//                 </tr>
//                 <tr>
//                     <td>PM10</td>
//                     <td>${pm10}</td>
//                     <td>ug/m3</td>
//                     <td>${emoji(pm10)[2]}</td>
//                 </tr>
//                 </table>
//                 <br>
//                 Situação (PM25): ${emoji(pm25)[0]}
//                 `
//         var customOptions =
//         {
//             'font-size': '1.2rem',
//             'border':'5px solid black',
//             'margin':'0px',
//             'background-color': 'red',
//             'className' : 'popupCustom'
//         }
//         if(location.id == ""){
//             L.marker([location.coord.lat, location.coord.lng], { title: location.name, icon: IconSemPonto })
//             .bindPopup(popUpInativo, customOptions)
//             .addTo(map);
//         }else{
            
//             L.marker([location.coord.lat, location.coord.lng], { title: location.name, icon: emoji(pm25)[1] })
//             .bindPopup(popUp,customOptions)
//             .addTo(map);
//         }
//         i++;});
    
    
// }

// // localhost:3000/dados?singleDate="2023-12-12T21:00:00Z"&moqaID="A5BBFC"
// async function pesquisa(date,id){
//     const query = `singleDate=${date}&moqaID=${id}`;
//     try {
//         const response = await fetch(`/dadosMapa?${query}`);

//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//             throw new Error('A resposta não é JSON');
//         }

//         const data = await response.json();
//         data.forEach(element => {
//             console.log("Temos o elemento: " + element.avgPM25 + "E com count: " + element.count)
//         });
//         return data
//     } catch (error) {
//         console.error('Erro ao buscar dados:', error);
//     }
// }
// function error(err) {
//     if (err.code === err.PERMISSION_DENIED) {
//         alert("Permissão de localização negada. Por favor, permita o acesso à localização nas configurações do navegador.");
//     } else if (err.code === err.POSITION_UNAVAILABLE) {
//         alert("A posição não está disponível.");
//     } else if (err.code === err.TIMEOUT) {
//         alert("A requisição de localização expirou.");
//     } else {
//         alert("Erro desconhecido.");
//     }
//     console.log(err);
// }


    
// // Obtém a posição atual
// navigator.geolocation.getCurrentPosition(sucess, error);
