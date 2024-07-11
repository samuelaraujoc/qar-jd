var map;
function sucess(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;


    if (map === undefined){
        map = L.map('map').setView([latitude, longitude], 13);
    }else{
        map.remove();
        map = L.map('map').setView([latitude, longitude], 13);
    }


    var locations = [
        ["Praia de Iracema", -3.718879,-38.516058,"Rua Tremembés (CITINOVA)"],
        ["Mucuripe", -3.723857963, -38.48027547,"Av. Vicente de Castro (Areninha Morro Santa Terezinha)"],
        ["Aldeota / Praça Portugal", -3.73338, -38.4968,"Av. Dom Luís (Praça Portugal)"],
        ["Cocó", -3.751606, -38.49056,"Av. Washington Soares, 4269 - Cocó"],
        ["Centro / Paço Municipal", -3.725251, -38.523763,"Rua São José SN (Paço Municipal)"],
        ["SEUMA", -3.81111, -38.51,"Av. Dep. Paulino Rocha, 1343 (SEUMA)"],
        ["Bairro de Fátima", -3.751894, -38.526333,"Av. Treze de Maio (Igreja Nossa Sra. de Fátima)"],
        ["Siqueira", -3.784397,-38.580495,"Av. Osório de Paiva X Rua Lebom Maia (Siqueira)"]
      ];
 
    // a função tileLayer renderiza todos os aspéctos visuais do mapa: predios, ruas, areas verdes, etc.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //voce no mapa
    //let eu = L.marker(latitude,longitude).bindPopup('Você está aqui!').addTo(map);
    // adicionando indicação de monitores no mapa
    const url = 'Semponto.png'
    const customIcon = L.icon({iconUrl:url, iconSize: [50,50]});
    
    for (var i = 0; i <locations.length; i++) {
        L.marker([locations[i][1], locations[i][2]],{title:locations[i][0],icon: customIcon})
        .bindPopup(`<span class="popup">
          Nome:${locations[i][0]}<br>
          Endereço: ${locations[i][3]}<br>
          PM25: null<br>
          PM10: null<br>
          Situação: Inativo
          </span>`)
        .addTo(map);
      }
}
//var watchID = navigator.geolocation.watchPosition(sucess, (err)=> console.log(err), {enableHighAccuracy:true, timeout:20000});
navigator.geolocation.getCurrentPosition(sucess, (err)=> console.log(err));
//navigator.geolocation.clearWatch(watchID);


