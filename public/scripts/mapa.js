var map;
function sucess(pos) {
    console.log(pos.coords.latitude, pos.coords.longitude);
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

    var locations = [
        ["Praia de Iracema", -3.718879, -38.516058, "Rua Tremembés (CITINOVA)","DD56F0"],
        ["Mucuripe", -3.723857963, -38.48027547, "Av. Vicente de Castro (Areninha Morro Santa Terezinha)","DD31EC"],
        ["Aldeota / Praça Portugal", -3.73338, -38.4968, "Av. Dom Luís (Praça Portugal)","DC40AC"],
        ["Cocó", -3.751606, -38.49056, "Av. Washington Soares, 4269 - Cocó","Z3S59I"],
        ["Centro / Paço Municipal", -3.725251, -38.523763, "Rua São José SN (Paço Municipal)","DC663C"],
        ["SEUMA", -3.81111, -38.51, "Av. Dep. Paulino Rocha, 1343 (SEUMA)","DCB604"],
        ["Bairro de Fátima", -3.751894, -38.526333, "Av. Treze de Maio (Igreja Nossa Sra. de Fátima)","DD3538"],
        ["Siqueira", -3.784397, -38.580495, "Av. Osório de Paiva X Rua Lebom Maia (Siqueira)","A70044"],
        ["Carlito Pamplona", -3.71196, -38.5554, "Leste Oeste (EMEF Hilberto Silva)","DD31EC"],
        ["Aracapé",	-3.828993, -38.590444,"Rua Juvêncio Sales, S.N. (UAP Dr. João Elísio Holanda)",""],
        ["José Walter",-3.82838, -38.5567,"Avenida C X Avenida L (EMEIF Rachel de Queiroz)"	,"DDCA1C"],
        ["Itaperi",	-3.787456, -38.548116, "Avenida Bernardo Manuel X Avenida Dr. Silas Munguba (Itaperi)","DD2BDC"],
        ["Messejana",-3.831651276, -38.49391131,"Rua Padre Pedro de Alencar X Rua Joaquim Bezerra (Messejana)",""],
        ["Pici", -3.738869369, -38.56939792, "Av. Humberto Monte (Campus do Pici UFC)",""],
        ["Passaré",	-3.81627, -38.5317,"Av. Pres. Juscelino Kubitschek X Av. dos Paroaras (Hospital Sarah)","DD3468"],
        ["Beira Mar", -3.72612, -38.4951, "Av. Beira Mar X Av. Desembargador Moreira (Beira Mar)", "DD2BA4"],
        ["Cais do Porto", -3.718275, -38.46594, "Av. José Sabóia (EMEIF Godofredo de Castro Filho)","A5BBFC" ],
        ["Jardim Iracema",	-3.724067, -38.583269, "Av. Major Assis x Rua Alberto Ferreira", "EDA13C"],
        ["Centro / Praça da Lagoinha",	-3.72546, -38.5327,	"Rua Guilherme Rocha X Avenida Tristão Gonçalves (Praça da Lagoinha)", "E4C790"],
        ["Farias Brito", -3.731477484, -38.54512297, "Av. José Jatahy X Av. Bezerra de Menezes (Farias Brito)","E4D1F0"],
        ["Parque do Cocó", 	-3.744282,	-38.484604,	 "Av. Padre Antônio Tomás (Parque do Cocó)","X3TYO5"],
        ["SCSP",-3.751196, -38.500498, "Av. Pontes Vieira (SCSP)", "DD32D4"	],
        ["CIDADE 2.000",-3.74885186, -38.47123623,	"Rua Andrade Furtado (Cidade 2000)",""],
        ["Aerolândia / Rotatória",	-3.763680819, -38.50875898, "Av. Governador Raul Barbosa (Rotatória)","AG4F3T" ],
        ["São João do Tauape" ,	-3.761116037, -38.50553251, "Av. Governador Raul Barbosa (Polo de Lazer Rachel Guimarães)","RTY79H" ],
        ["Manuel Dias Branco",	-3.755231,	-38.468335,	"R. Zuca Accioly, 702 - Manuel Dias Branco, Fortaleza - CE, 60191-335",""],
        ["Dionísio Torres / Face de Cristo", -3.752630928, -38.49706361, "R. Santa Esmeralda  (Parque Adahil Barreto)", "H45UY3"],
        ["Edson Queiroz / Centro de Eventos",-3.761188,	-38.478607, "Av. Governador Manoel de Castro (Centro de Eventos)", "" ],
        ["Edson Queiroz /Parque do Cocó", -3.756222, -38.483361, "Av. Sebastião de Abreu (Parque do Cocó)",""],
        ["Aerolândia / Polo de lazer", 	-3.772590818, -38.5121969,	"Av. Governador Raul Barbosa (Pista de Skate)","RWZ6K0"],
        ["Cidade Ecológica / Edson Queiroz", -3.778036787,	-38.45621658, "Rua dos Muricis (Cidade Ecológica / Edson Queiroz)",""],
        ["Cidade Ecológica / Edson Queiroz", -3.778036787,	-38.45621658, "Rua dos Muricis (Cidade Ecológica / Edson Queiroz)",""],
        ["Cidade Ecológica / Edson Queiroz", -3.778036787,	-38.45621658, "Rua dos Muricis (Cidade Ecológica / Edson Queiroz)",""],

    ];

    // Renderiza os aspectos visuais do mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Icone customizado para os marcadores
    const urlSemPonto = '../img/Semponto.png';
    const IconSemPonto = L.icon({ iconUrl: urlSemPonto, iconSize: [50, 50] });

    const urlImgBoa = '../img/Boa.png';
    const IconBoa = L.icon({ iconUrl: urlImgBoa, iconSize: [50, 50] });

    const urlImgMuitoRuim = '../img/Muito-ruim.png';
    const IconMuitoRuim = L.icon({ iconUrl: urlImgMuitoRuim, iconSize: [50, 50] });

    const urlImgRuim = '../img/Ruim.png';
    const IconRuim = L.icon({ iconUrl: urlImgRuim, iconSize: [50, 50] });

    const urlmoderado = '../img/Moderada.png';
    const IconModerado = L.icon({ iconUrl: urlmoderado, iconSize: [50, 50] });


    for (var i = 0; i < locations.length; i++) {
        if (locations[i][4] === ""){
            L.marker([locations[i][1], locations[i][2]], { title: locations[i][0], icon: IconSemPonto })
                .bindPopup(`<span class="popup">
                    Nome: ${locations[i][0]}<br>
                    Endereço: ${locations[i][3]}<br>
                    PM25: null<br>
                    PM10: null<br>
                    Situação: Inativo
                </span>`)
                .addTo(map);}
        else if (locations[i][4] === "A70044" || locations[i][4] === "DC40AC" || locations[i][4] === "DD2BDC"){
            L.marker([locations[i][1], locations[i][2]], { title: locations[i][0], icon: IconMuitoRuim })
                .bindPopup(`<span class="popup">
                    Nome: ${locations[i][0]}<br>
                    Endereço: ${locations[i][3]}<br>
                    PM25: null<br>
                    PM10: null<br>
                    Situação: Muito Ruim
                </span>`)
                .addTo(map);

        }
        else if (locations[i][4] === "DD31EC" || locations[i][4] === "DD3538" || locations[i][4] === "X3TYO5"){
            L.marker([locations[i][1], locations[i][2]], { title: locations[i][0], icon: IconModerado })
                .bindPopup(`<span class="popup">
                    Nome: ${locations[i][0]}<br>
                    Endereço: ${locations[i][3]}<br>
                    PM25: null<br>
                    PM10: null<br>
                    Situação: Moderado
                </span>`)
                .addTo(map);

        }
        else if (locations[i][4] === "AG4F3T" || locations[i][4] === "E4C790" || locations[i][4] === "E4D1F0" || locations[i][4] === "RTY79H" || locations[i][4] === "DDCA1C" || locations[i][4] === "DD32D4"){
            L.marker([locations[i][1], locations[i][2]], { title: locations[i][0], icon: IconRuim })
                .bindPopup(`<span class="popup">
                    Nome: ${locations[i][0]}<br>
                    Endereço: ${locations[i][3]}<br>
                    PM25: null<br>
                    PM10: null<br>
                    Situação: Ruim
                </span>`)
                .addTo(map);

        }       
        else{
            L.marker([locations[i][1], locations[i][2]], { title: locations[i][0], icon: IconBoa })
                .bindPopup(`<span class="popup">
                    Nome: ${locations[i][0]}<br>
                    Endereço: ${locations[i][3]}<br>
                    PM25: null<br>
                    PM10: null<br>
                    Situação: Boa
                </span>`)
                .addTo(map);

        }
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
