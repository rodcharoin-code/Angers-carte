// ========================
//  Variables globales
// ========================
let userMarker = null;
let routingControl = null;

// ========================
//  Carte
// ========================
const map = L.map('map', {
  center: [47.470856, -0.552696],
  zoom: 14.5,
  minZoom: 8,
  maxZoom: 25
});

// 🔧 AJOUTEZ CE CODE JUSTE APRÈS LA CRÉATION DE LA CARTE
// Détection mobile et ajustement du centre/zoom
function adjustMapForMobile() {
  // Vérifie si on est sur mobile (largeur <= 480px en portrait)
  if (window.innerWidth <= 480 && window.matchMedia("(orientation: portrait)").matches) {
    // 🔧 Nouveau centre pour mobile (ajustez ces coordonnées)
    map.setView([47.47749647346316, -0.55201782321044079], 14.2); // Centre légèrement décalé et zoom réduit
    
    console.log('📱 Vue mobile activée - Carte recentrée');
  } else {
    // Vue desktop normale
    map.setView([47.470856, -0.552696], 14.5);
    console.log('💻 Vue desktop activée');
  }
}

map.attributionControl.setPrefix('');

// Couches
const streetMap = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  {
    attribution: '© OpenStreetMap contributors, © CARTO',
    crossOrigin: true,
    maxZoom: 25
  }
);
const satelliteMap = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: '© Esri World Imagery',
    crossOrigin: true,
    maxZoom: 25
  }
);
streetMap.addTo(map);

// ===========================================
// POINTS D'INTÉRÊT + TRACÉ DEPUIS GEOJSON
// ===========================================

const pointsInteret = [
   
    // 🏁 DÉPART : Place Kennedy
    {
       coords: [47.469117, -0.558312],
        title: "Place du Président Kennedy",
        description: `Anciennement dominée par le stationnement automobile, la place du Président Kennedy vient d'être totalement transformée en un lieu de vie calme et végétalisé. Un projet porté par la ville d’Angers et imaginé par l’urbaniste Jacqueline Osty, ayant pour objectif de végétaliser un maximum la place, valoriser le patrimoine environnant et apaiser la circulation.

    Désormais entièrement piétonne, cette place encourage les mobilités douces avec des espaces cyclables dédiés et limite l’entrée des voitures en ville.

    Concernant la végétalisation, plusieurs îlots ont été plantés avec des plantes vivaces et locales. Les sols ont été rendus perméables afin d’assurer l’infiltration de l'eau et diminuer les îlots de chaleur en été. L'arrosage de la végétation est assuré par une cuve de récupération des eaux de pluie.

    La statue du roi René a été replacée pour retrouver une place d’honneur face au château, symbolisant l’histoire d’Angers.`,
        image: "",
        etapeId: "Départ"
    },
   
    // ÉTAPE 1 : Château d'Angers
    { 
      coords: [47.47063117697629, -0.5588421261128192],
        title: "Château d'Angers",
        description: `Le Château d'Angers est un site emblématique de la ville, véritable témoin de son histoire avec une valeur patrimoniale importante. Vous y trouverez La Tapisserie de l'Apocalypse, inscrite au registre Mémoire du Monde de l'UNESCO depuis le 18 mai 2023.

En lien constant avec la Ligue pour la Protection des Oiseaux (LPO), le Château d'Angers œuvre pour la préservation de l'environnement. Depuis 2011, année du premier inventaire de la faune et de la flore, le site est passé de 99 à 220 espèces observées en 2021.

La flore est très présente au sein du site avec 150 espèces recensées. Les orchidées, par exemple, sont représentées par l'ophrys abeille, l'orchis singe et l'orchis bouc. Des espèces de fougères sont également présentes, tout particulièrement au niveau des remparts. 

Ce monument abrite pas moins de 39 espèces d'oiseaux. Le martinet noir ou encore le moineau domestique profitent des cavités présentes dans le bâti pour y nicher. Le crécerelle niche également sur le site. D'autres espèces, comme la chouette hulotte  ou l'effraie des clochers peuvent être observées durant leurs activités de chasse. En hiver, les cavités des remparts du château servent à l'hibernation pour des pipistrelles communes et des oreillards.`,
        image: "https://www.destination-angers.com/app/uploads/destination-angers-tourisme/2024/11/thumbs/vue_aerienne_chateau_angers-1920x960.webp",
      source : "source : destinations-angers",
      etapeId: "etape-1"
    },
    
    // ÉTAPE 2 : Promenade du Bout du Monde
    {
        coords: [47.471061, -0.559224],
        title: "Promenade du Bout du Monde",
        description: `Située entre le château et la cité historique, la Promenade du Bout du Monde est un lieu emblématique de la ville d'Angers. Anciennement la voie principale d'entrée au château d'Angers, elle offre aujourd'hui une vue imprenable sur la Maine et le quartier de la Doutre. 

Entièrement réaménagée et inaugurée le 24 juin 2018, la promenade a été repensée pour favoriser les mobilités douces et la biodiversité. La piétonnisation du site et la plantation de plus de 7 000 végétaux issus de 128 espèces différentes, majoritairement locales et mellifères, ont transformé cet espace d'origine très minéral.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Saint-Maurice_cathedral%2C_west_facade._Angers%2C_France.jpg/640px-Saint-Maurice_cathedral%2C_west_facade._Angers%2C_France.jpg",
    imageCredit: 'Photo : <a href="https://commons.wikimedia.org/wiki/File:Saint-Maurice_cathedral,_west_facade._Angers,_France.jpg" target="_blank" style="color: #3498db;">Moonik</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" style="color: #3498db;">CC BY-SA 3.0</a>',
        etapeId: "etape-2"
    },
    
    // ÉTAPE 3 : Cathédrale Saint-Maurice
    {
        coords: [47.47043794223846, -0.5552633179461097],
        title: "Cathédrale Saint-Maurice d'Angers",
        description: `Dominant la Maine depuis son promontoire, la cathédrale Saint-Maurice est l'un des monuments les plus emblématiques d'Angers. Édifiée entre le XIIᵉ et le XIIIᵉ siècle, elle marque la transition entre l'art roman et le style gothique angevin, aussi appelé "Plantagenêt", caractérisé par ses voûtes bombées et son atmosphère lumineuse.

Au fil des siècles, la cathédrale a été le cœur spirituel et politique de la ville : c'est ici que furent célébrées les cérémonies des ducs d'Anjou et des Plantagenêt. Classée Monument historique depuis 1862, elle reste un témoin majeur du rayonnement médiéval d'Angers.

À l'intérieur, plusieurs éléments méritent l'attention :
Les vitraux du XIIIᵉ siècle, parmi les plus anciens de France, représentant notamment la Vie de saint Maurice et l'Apocalypse ;
Le grand orgue Cavaillé-Coll, chef-d'œuvre du XIXᵉ siècle, restauré avec soin pour conserver son acoustique d'origine ;
Les voûtes angevines, typiques de l'architecture locale ;
La statue de la Vierge au sourire, emblématique de l'art gothique angevin, qui accueille les visiteurs depuis la nef centrale.

Aujourd'hui, la cathédrale s'inscrit pleinement dans une démarche de préservation durable du patrimoine : les restaurations utilisent des matériaux traditionnels locaux comme le tuffeau et la chaux, tandis que l'éclairage à faible consommation permet de sublimer l'architecture sans nuire à l'environnement.`,
        image: "",
        etapeId: "etape-3"
    },
    
    // ÉTAPE 4 : Maison d'Adam
    {
        coords: [47.47037651735204, -0.5541144593090486],
        title: "La Maison d'Adam",
        description: `Au cœur du centre historique, sur la place Sainte-Croix, la Maison d'Adam est l'un des trésors les plus emblématiques d'Angers. Construite vers 1491, cette demeure illustre l'architecture médiévale angevine. Ses façades sculptées, ses colombages et ses figures fantastiques témoignent du savoir-faire des artisans de la fin du XVe siècle.

Classée Monument historique depuis 1922, la Maison d'Adam doit son nom à une sculpture représentant Adam et Ève sur sa façade principale. Longtemps habitée par la confrérie des selliers-bourreliers, elle abrite désormais la Maison des Artisans qui valorise les métiers d'art et la création locale.

Ce lieu redynamise le centre-ville par des activités respectueuses et locales, fondées sur la transmission des savoir-faire et la mise en valeur du patrimoine bâti.`,
        image: "",
        etapeId: "etape-4"
    },
    
    // ÉTAPE 5 : Rue Saint-Laud
    {
        coords: [47.471629, -0.553788],
        title: "Rue Saint-Laud",
        description: `La rue Saint-Laud relie le cœur historique d'Angers à la gare, il s'agit de l'une des plus anciennes artères de la ville. Elle conserve le tracé du quartier marchand médiéval, autrefois animé par les auberges et ateliers d'artisans.

Aujourd'hui entièrement réaménagée, la rue Saint-Laud s'inscrit dans la dynamique de revitalisation durable du centre-ville. Les travaux menés par la ville d'Angers ont permis d'élargir les espaces piétons, de végétaliser les trottoirs et de valoriser les façades patrimoniales tout en soutenant les commerces locaux.

N'hésitez pas à faire une pause dans l'un des cafés ou à parcourir les boutiques alentours, idéal pour soutenir les acteurs locaux.`,
        image: "",
        etapeId: "etape-5"
    },
    
    // ÉTAPE 6 : Muséum des Sciences Naturelles
    {
      coords: [47.47349436796099, -0.5464154666626944],
        title: "Muséum des Sciences Naturelles",
        description: `Créé en 1796, le Muséum des Sciences Naturelles d'Angers abrite plus de 600 000 spécimens : animaux naturalisés, insectes, fossiles, squelettes ou encore minéraux. Véritable lieu de savoir et de curiosité, il invite le visiteur à explorer la richesse et la diversité du monde vivant.

Les différentes expositions permanentes et temporaires abordent des thématiques actuelles telles que le réchauffement climatique, la disparition des espèces, la biodiversité ou l'impact de l'Homme dans les écosystèmes. 

Le musée s'inscrit dans une démarche de sensibilisation du public à la protection de la nature et à la valorisation du patrimoine naturel et s'est donné cinq missions principales : la conservation, la diffusion des connaissances, l'expertise, la pédagogie et la recherche scientifique.`,
        image: "",
        etapeId: "etape-6"
    },
    
    // ÉTAPE 7 : Jardin des Plantes
    {
      coords: [47.47411016710265, -0.5449099946854348],
        title: "Le Jardin des Plantes",
        description: `Fondé au XVIIIᵉ siècle, au-delà des remparts, le Jardin des Plantes d'Angers fut le premier jardin botanique de la ville, initialement consacré à la recherche. Au fil des années, grâce à des échanges internationaux, la diversité botanique augmente. En 1901 et 1905, suite à une tempête dévastatrice, le jardin est entièrement rénové par Édouard André, puis accessible au public.

Situé au cœur de la ville, ce jardin à l'anglaise offre de belles allées, des statues au style romantique, ainsi qu'un bassin agrémenté de petites cascades et de jeux de miroir. Il abrite une riche diversité végétale, entre arbres centenaires, massifs floraux et bosquets. La faune y est également présente, avec poules, lapins, chèvres, cygnes et parfois des écureuils.`,
        image: "",
        etapeId: "etape-7"
    },
    
    // ÉTAPE 8 : Jardin du Mail
    {
        coords: [47.47053649104745, -0.5461446578724273],
        title: "Le Jardin du Mail",
        description: `Accolée au Jardin du Mail, l'Avenue Jeanne-d'Arc illustre parfaitement la volonté de végétalisation de l'espace urbain angevin. Inaugurée le 25 avril 2018 après un an de travaux, elle constitue l'un des projets phares du plan global de végétalisation de la ville.

La rénovation complète de l'avenue a permis d'optimiser son éclairage grâce à l'installation de 36 lanternes ainsi que de 67 projecteurs orientés vers les prairies, l'allée centrale et le square. La végétation occupe désormais une place majeure, avec la plantation de 154 tilleuls à petites feuilles, 26 arbres fruitiers, 46 platanes, 810 hortensias et pas moins de 10 000 crocus.

Du mobilier urbain est venu compléter l'aménagement, comprenant 33 fauteuils et 10 bancs répartis le long de l'avenue. Avec plus de 11 600 m² végétalisés, soit plus de la moitié de la surface totale de cette dernière, l'espace alterne entre zones enherbées et espaces de détente en bordure, tandis que la large allée centrale permet un partage entre piétons et cyclistes.`,
        image: "",
        etapeId: "etape-8"
    },
    
    // ÉTAPE 9 : Benoit Chocolats
    {
      coords: [47.46891297404408, -0.553276794250633],
        title: "Benoit Chocolats Angers",
        description: `La chocolaterie confectionne ses créations à la main dans son atelier situé aux Ponts-de-Cé, près d'Angers, en perpétuant un savoir-faire artisanal. Son produit emblématique, Le Caramandes®, a valu à l'entreprise, fondée en 1975 à Angers, de nombreuses distinctions tant au niveau national qu'international. Créé en 2008, il s'agit d'une "fine feuille triangulaire, composée d'amandes effilées, torréfiées, caramélisées au beurre salé, puis enrobée d'un chocolat finement sélectionné".`,
        image: "",
        etapeId: "etape-9"
    },
    
    // ÉTAPE 10 : Maison du Quernon d'Ardoise
    {
      coords: [47.46846307813217, -0.5542979002335384],
        title: "La Maison du Quernon d'Ardoise",
        description: `La Maison du Quernon d'Ardoise, chocolaterie angevine, est célèbre pour sa spécialité lancée en 1996, le Quernon d'Ardoise®, évoquant les toits d'ardoise typiques de l'Anjou. Enrobée de chocolat bleu, cette gourmandise est composée de nougatine caramélisée aux amandes et aux noisettes.`,
        image: "",
        etapeId: "etape-10"
    }
];

// ===========================================
// PARKINGS ANGERS - Coordonnées officielles + nombre de places totales
// ===========================================

let parkingMarkers = [];

// Données officielles des parkings d'Angers (depuis votre CSV)
const parkingsAngers = [
    { nom: "Fleur d'Eau Les Halles", coords: [47.4725623676, -0.5549583804], places: 383, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Leclerc souterrain", coords: [47.47144192, -0.5460560826], places: 235, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Saint-Serge Mitterrand", coords: [47.4766083921, -0.5505741312], places: 133, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Saint-Serge Cinéma", coords: [47.4791055266, -0.5496420046], places: 305, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Ralliement", coords: [47.4712242886, -0.5518064832], places: 432, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Mail", coords: [47.4712547046, -0.544924904], places: 960, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Molière", coords: [47.4746632157, -0.5542768918], places: 416, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Marengo", coords: [47.4648842682, -0.55482318], places: 305, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Saint-Serge Mitterrand Maine", coords: [47.4772420234, -0.5520259119], places: 151, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Haras Public", coords: [47.4648996364, -0.5537654166], places: 112, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Le Quai", coords: [47.472633062, -0.5650681602], places: 180, horaires: "24h/24 - 7j/7", tarifs: "Gratuit", gratuit: true },
    { nom: "Maternité", coords: [47.481454697, -0.5544136239], places: 56, horaires: "24h/24 - 7j/7", tarifs: "• 1h : 1,50€<br>• 2h : 3,00€<br>• Journée : 12,00€" },
    { nom: "St Laud", coords: [47.4644889197, -0.5589430207], places: 450, horaires: "24h/24 - 7j/7", tarifs: "• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€" },
    { nom: "Bressigny", coords: [47.4673424819, -0.5493422409], places: 172, horaires: "Lun-Sam : 7h-20h<br>Dimanche : Fermé", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• Journée : 8,00€" },
    { nom: "Saint-Serge Patinoire", coords: [47.479609228, -0.5463170241], places: 234, horaires: "24h/24 - 7j/7", tarifs: "• 1ère heure : Gratuite<br>• 2h : 1,50€<br>• 3h : 3,00€<br>• Journée : 12,00€" },
    { nom: "Confluences", coords: [47.4806753779, -0.5545456512], places: 30, horaires: "24h/24 - 7j/7", tarifs: "• 1h : 1,50€<br>• 2h : 3,00€<br>• Journée : 12,00€" },
    { nom: "St Laud II", coords: [47.46395364183343, -0.5613189817564422], places: 576, horaires: "24h/24 - 7j/7", tarifs: "• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€" },
    { nom: "Larrey", coords: [47.4806370511, -0.55495124], places: 28, horaires: "24h/24 - 7j/7", tarifs: "• 1h : 1,50€<br>• 2h : 3,00€<br>• Journée : 12,00€" }
];

// Icône simple - juste l'emoji parking
function createParkingIcon() {
    return L.divIcon({
        className: 'parking-marker-simple',
        html: '<div style="font-size: 20px;">🅿️</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Créer les marqueurs pour tous les parkings
function addParkingMarkers() {
    console.log('🅿️ Ajout des parkings sur la carte...');
    
    parkingsAngers.forEach(parking => {
        const marker = L.marker(parking.coords, {
            icon: createParkingIcon()
        });
               
       const popupContent = `
            <div class="popup-content" style="min-width: 220px;">
                <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px;">        
                    🅿️ Parking ${parking.nom}
                    </h3>
                    
                    <div style="background: #f0f4ff; padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #3498db;">
                         <div style="font-weight: bold; margin-bottom: 5px; color: #2c3e50; font-size: 17px; line-height: 1.4;">
                        📊 Nombre de places
                    </div>
                    <div style="font-size: 16px; color: #34495e; line-height: 1.4; white-space: pre-line;">
                        ${parking.places} places
                    </div>
                </div>
                
                <div style="background: #fff8e1; padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #ffc107;">
                    <div style="font-weight: bold; margin-bottom: 5px; color: #2c3e50; font-size: 17px; line-height: 1.4;">
                    🕐 Horaires
                </div>
                <div style="font-size: 16px; color: #34495e; line-height: 1.4; white-space: pre-line; text-align: justify;">
                    ${parking.horaires}
                </div>
            </div>
            
            <div style="background: #e8f5e9; padding: 10px; border-radius: 8pxroute.duration = route.duration * 2.4;; border-left: 4px solid #4caf50;">
                <div style="font-weight: bold; margin-bottom: 5px; color: #2c3e50; font-size: 17px; line-height: 1.4;">
                    💰 Tarifs
                </div>
                <div style="font-size: 16px; color: #34495e; line-height: 1.4; white-space: pre-line; text-align: justify;">
                ${parking.tarifs}
                    </div>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 320,
            className: 'custom-popup'
        });
        
        marker.addTo(map);
        parkingMarkers.push(marker);
    });
    
    console.log(`✅ ${parkingMarkers.length} parkings affichés sur la carte`);
}

// ===========================================
// STATIONS VÉLO ET GARE
// ===========================================

let stationsMarkers = [];

// Stations vélo Irigo
const stationsVelo = [
    { coords: [47.47478, -0.55433], nom: "Station Vélo 1" },
    { coords: [47.47257665809736, -0.5550048302703734], nom: "Station Vélo 2" },
    { coords: [47.46930517494239, -0.5572719069406034], nom: "Station Vélo 3" },
    { coords: [47.46467964809746, -0.5547610585035498], nom: "Station Vélo 4" },
    { coords: [47.46450663645139, -0.5589971017252637], nom: "Station Vélo 5" },
];

// Icône vélo
function createVeloIcon() {
    return L.divIcon({
        className: 'velo-marker',
        html: '<div style="font-size: 28px;">🚲</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Icône train
function createTrainIcon() {
    return L.divIcon({
        className: 'train-marker',
        html: '<div style="font-size: 32px;">🚉</div>',
        iconSize: [35, 35],
        iconAnchor: [17, 17]
    });
}

// Ajouter les stations vélo
function addStationsVelo() {
    stationsVelo.forEach(station => {
        const marker = L.marker(station.coords, {
            icon: createVeloIcon()
        });
        
        const popupContent = `<div style="text-align: center; padding: 10px; min-width: 200px;"><h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px;">🚲 ${station.nom}</h3><div style="font-size: 13px; color: #555; line-height: 1.5;">Station de vélos en libre-service<br><strong>Irigo Vélo</strong></div></div>`;
        
        marker.bindPopup(popupContent, {
            maxWidth: 250,
            className: 'custom-popup'
        });
        
        marker.addTo(map);
        stationsMarkers.push(marker);
    });
    
    console.log(`✅ ${stationsVelo.length} stations vélo ajoutées`);
}

// Ajouter la gare
function addGare() {
    const gareMarker = L.marker([47.4642, -0.5564], {
        icon: createTrainIcon()
    });
    
    const popupContent = `<div style="padding: 12px; min-width: 280px;"><h3 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 17px; text-align: center;">🚉 Gare d'Angers Saint-Laud</h3><div style="background: #e3f2fd; padding: 10px; border-radius: 6px; margin-bottom: 10px; border-left: 3px solid #2196f3;"><div style="font-weight: bold; margin-bottom: 5px; color: #1976d2; font-size: 14px;">🚄 Destinations principales</div><div style="font-size: 13px; color: #555; line-height: 1.6;">• <strong>Paris</strong> (1h30 en TGV)<br>• <strong>Nantes</strong> (40 min)<br>• <strong>Rennes</strong> (1h15)<br>• <strong>Le Mans</strong> (40 min)<br>• <strong>Tours</strong> (45 min)<br>• <strong>La Rochelle</strong> (1h30)</div></div><div style="background: #fff3e0; padding: 10px; border-radius: 6px; border-left: 3px solid #ff9800;"><div style="font-weight: bold; margin-bottom: 5px; color: #f57c00; font-size: 14px;">📍 Distance au circuit</div><div style="font-size: 14px; color: #555;"><strong>10 minutes à pied</strong> du départ du circuit touristique</div></div></div>`;
    
    gareMarker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'custom-popup'
    });
    
    gareMarker.addTo(map);
    stationsMarkers.push(gareMarker);
    
    console.log('✅ Gare d\'Angers ajoutée');
}


// TRACÉ DU CIRCUIT (LineString depuis ton GeoJSON) - AVEC EXTENSION PARC DU MAIL
const circuitTrace = [
    [-0.558385, 47.469357], [-0.558062, 47.469717], [-0.558092, 47.469722],
    [-0.558055, 47.469774], [-0.55804, 47.46986], [-0.558081, 47.469951],
    [-0.55889, 47.470584], [-0.559004, 47.470512], [-0.558852, 47.470606],
    [-0.55892, 47.470664], [-0.559049, 47.470736], [-0.559375, 47.470977],
    [-0.559303, 47.471024], [-0.559375, 47.470977], [-0.559049, 47.470736],
    [-0.55892, 47.470664], [-0.558659, 47.470462], [-0.558524, 47.47056],
    [-0.558252, 47.470711], [-0.557979, 47.470893], [-0.557894, 47.470916],
    [-0.557584, 47.471065], [-0.557392, 47.471133], [-0.556942, 47.471201],
    [-0.556663, 47.471005], [-0.556322, 47.471165], [-0.556103, 47.471016],
    [-0.555811, 47.470876], [-0.555575, 47.470701], [-0.555556, 47.470669],
    [-0.555556, 47.470646], [-0.555497, 47.470647], [-0.555498, 47.47059],
    [-0.555219, 47.470412], [-0.554863, 47.470192], [-0.554586, 47.470153],
    [-0.554543, 47.470128], [-0.554195, 47.470362], [-0.554151, 47.470405],
    [-0.553869, 47.470941], [-0.553845, 47.470951], [-0.553898, 47.470967],
    [-0.553876, 47.471006], [-0.554308, 47.471236], [-0.554279, 47.471261],
    [-0.554342, 47.471298], [-0.553898, 47.471583], [-0.553802, 47.471601],
    [-0.55391, 47.471725], [-0.553802, 47.471601], [-0.553572, 47.471733],
    [-0.551997, 47.472803], [-0.552116, 47.472889], [-0.552081, 47.472964],
    [-0.552025, 47.47296], [-0.551908, 47.472979], [-0.551874, 47.472956],
    [-0.551839, 47.472978], [-0.551658, 47.473093], [-0.551537, 47.473031],
    [-0.551529, 47.472999], [-0.550981, 47.473077], [-0.550248, 47.473127],
    [-0.550022, 47.472998], [-0.54995, 47.473049], [-0.549722, 47.473182],
    [-0.549509, 47.473349], [-0.549248, 47.473552], [-0.548992, 47.473671],
    [-0.548854, 47.473663], [-0.548827, 47.473728], [-0.548771, 47.473765],
    [-0.548363, 47.473956], [-0.548254, 47.473952], [-0.547695, 47.473787],
    [-0.547508, 47.473709], [-0.54748, 47.473741], [-0.547434, 47.473739],
    [-0.546783, 47.473551], [-0.546016, 47.473426], [-0.545779, 47.473409],
    [-0.545656, 47.473741], [-0.545461, 47.473688], [-0.545051, 47.473509],
    [-0.544801, 47.473779], [-0.545047, 47.473892], [-0.544809, 47.474146],
    [-0.544895, 47.474041], [-0.545005, 47.474102], [-0.545063, 47.474168],
    [-0.545074, 47.474229], [-0.545044, 47.474309], [-0.544852, 47.474533],
    [-0.544866, 47.47463], [-0.544977, 47.474813], [-0.544978, 47.474871],
    [-0.544937, 47.474954], [-0.544814, 47.47507], [-0.544746, 47.47519],
    [-0.544832, 47.475279], [-0.544884, 47.475372], [-0.544624, 47.475481],
    [-0.544419, 47.475492], [-0.544256, 47.475451], [-0.544107, 47.475373],
    [-0.544025, 47.475293], [-0.543939, 47.475291], [-0.54382, 47.47533],
    [-0.543575, 47.475359], [-0.543263, 47.475296], [-0.543121, 47.475236],
    [-0.542921, 47.475094], [-0.542844, 47.474923], [-0.542921, 47.474789],
    [-0.543002, 47.474727], [-0.543028, 47.474676], [-0.542977, 47.474541],
    [-0.543009, 47.474439], [-0.543123, 47.474384], [-0.543242, 47.474348],
    [-0.543149, 47.474308], [-0.543311, 47.474378], [-0.54341, 47.47433],
    [-0.543512, 47.474318], [-0.543959, 47.474369], [-0.544165, 47.474301],
    [-0.544301, 47.474288], [-0.544371, 47.474248], [-0.544463, 47.474115],
    [-0.544597, 47.47403], [-0.544737, 47.474008], [-0.544895, 47.474041],
    [-0.545047, 47.473892], [-0.544801, 47.473779], [-0.545051, 47.473509],
    [-0.545092, 47.47352], [-0.545148, 47.473505], [-0.545194, 47.47347],
    [-0.54546, 47.473043], [-0.545449, 47.473001], [-0.545706, 47.472588],
    [-0.545761, 47.472596], [-0.545806, 47.472575], [-0.545995, 47.472304],
    [-0.54596, 47.472274], [-0.546022, 47.472189], [-0.546138, 47.472086],
    [-0.546687, 47.471409], [-0.546766, 47.471243], [-0.546883, 47.471218],
    [-0.546939, 47.471173], [-0.54729, 47.470749], [-0.547265, 47.470718],
    [-0.547209, 47.470689], [-0.547148, 47.470697], [-0.547089, 47.470727],
    [-0.546904, 47.470662], [-0.546857, 47.470719], [-0.546586, 47.47079],
    [-0.54636, 47.470726], [-0.546256, 47.470523], [-0.546303, 47.470453],
    [-0.545814, 47.470286], [-0.545737, 47.47034], [-0.545662, 47.47035],
    [-0.545601, 47.470341], [-0.545522, 47.47029], [-0.545361, 47.470464],
    [-0.545021, 47.47035],
    
    // 🆕 DÉBUT EXTENSION PARC DU MAIL (ALLER)
    [-0.544866, 47.470319],  // Point 1 - Votre coordonnée
    [-0.545061, 47.470011],  // Point 2 - Votre coordonnée
    [-0.543467, 47.469473],  // Point 3 - Votre coordonnée
    [-0.541123, 47.468663],  // Point 4 - Votre coordonnée
    [-0.538944, 47.467936],  // Point 5 - Votre coordonnée
    [-0.536972, 47.467300],  // Point 6 - 🎯 POINT FINAL (votre coordonnée)
    
    // 🔄 RETOUR (DEMI-TOUR)
    [-0.538944, 47.467936],  // Retour Point 5
    [-0.541123, 47.468663],  // Retour Point 4
    [-0.543467, 47.469473],  // Retour Point 3
    [-0.545061, 47.470011],  // Retour Point 2
    [-0.544866, 47.470319],  // Retour Point 1
    [-0.545021, 47.47035],   // Retour sur le tracé principal
    // 🆕 FIN EXTENSION
    
    // ✅ REPRISE DU TRACÉ ORIGINAL
    [-0.545361, 47.470464], [-0.545522, 47.47029],
    [-0.545601, 47.470341], [-0.545662, 47.47035], [-0.545737, 47.47034],
    [-0.545814, 47.470286], [-0.546303, 47.470453], [-0.546367, 47.470382],
    [-0.546629, 47.470319], [-0.546804, 47.470381], [-0.546893, 47.470253],
    [-0.547425, 47.470433], [-0.547452, 47.470528], [-0.547611, 47.470586],
    [-0.547802, 47.470665], [-0.548028, 47.47042], [-0.548149, 47.47032],
    [-0.548165, 47.470279], [-0.548827, 47.469802], [-0.549031, 47.469629],
    [-0.549804, 47.469079], [-0.55125, 47.467986], [-0.551629, 47.4682],
    [-0.55296, 47.469094], [-0.553028, 47.469139], [-0.553358, 47.468923],
    [-0.553435, 47.468873], [-0.553473, 47.468893], [-0.553485, 47.468886],
    [-0.553522, 47.468909], [-0.554294, 47.468411], [-0.55556, 47.467599],
    [-0.556069, 47.467794], [-0.555796, 47.468121], [-0.555895, 47.46816],
    [-0.555508, 47.468614], [-0.555402, 47.468738], [-0.555633, 47.46883],
    [-0.555615, 47.468851], [-0.556019, 47.469003], [-0.556359, 47.469154],
    [-0.556432, 47.469192], [-0.556503, 47.469303], [-0.557047, 47.469218],
    [-0.557765, 47.469071], [-0.557921, 47.469359], [-0.557958, 47.469541],
    [-0.557884, 47.469687], [-0.558062, 47.469717], [-0.558073, 47.469704],
    [-0.558388, 47.469354]
];

let markers = [];
let circuitLine = null;



// ===========================================
// CRÉER LE CIRCUIT AVEC TON TRACÉ GEOJSON
// ===========================================

function addCircuitFromGeoJSON() {
    console.log('🗺️ Création du circuit depuis GeoJSON...');
    
    // Convertir [lon, lat] en [lat, lon] pour Leaflet
    const latLngCoords = circuitTrace.map(coord => [coord[1], coord[0]]);
    
    circuitLine = L.polyline(latLngCoords, {
        color: '#e74c3c',
        weight: 5,
        opacity: 0.85,
        className: 'circuit-line',
        smoothFactor: 1.0
    }).addTo(map);
    
    console.log('✅ Circuit créé avec', latLngCoords.length, 'points du tracé GeoJSON');
    
    // Ajuster la vue pour voir tout le circuit
    map.fitBounds(circuitLine.getBounds(), { padding: [50, 50] });
}

// ===========================================
// LANCEMENT - ORDRE CORRIGÉ
// ===========================================

addMarkers();
addCircuitFromGeoJSON(); // Crée d'abord le circuit

// 🔥 IMPORTANT : Ajuster la vue APRÈS le fitBounds()
setTimeout(() => {
    adjustMapForMobile(); // Recentre selon l'appareil
    addParkingMarkers();
    addStationsVelo();
    addGare();
}, 500); // Petit délai pour laisser le temps au circuit de se charger

// 🎯 FORCER LE RECALCUL DE LA CARTE APRÈS CHARGEMENT
setTimeout(() => {
    map.invalidateSize();
    adjustMapForMobile(); // Recentre une 2e fois pour être sûr
    console.log('🔄 Recalcul initial de la carte');
}, 1000);

console.log('✅ Carte interactive chargée avec tracé piéton et boutons vers étape.html');

// ========================
//  Etat de connexion
// ========================
let isOnline = navigator.onLine;
let offlineNotificationShown = false;

function updateConnectionStatus() {
  const statusElement = document.getElementById('connectionStatus');
  const notificationElement = document.getElementById('offlineNotification');
  if (navigator.onLine) {
    statusElement.textContent = '🟢 En ligne';
    statusElement.className = 'connection-status online';
    notificationElement.style.display = 'none';
    isOnline = true; offlineNotificationShown = false;
  } else {
    statusElement.textContent = '🔴 Hors ligne';
    statusElement.className = 'connection-status offline';
    if (!offlineNotificationShown) {
      notificationElement.style.display = 'block';
      offlineNotificationShown = true;
      setTimeout(() => { notificationElement.style.display = 'none'; }, 5000);
    }
    isOnline = false;
  }
}
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);
updateConnectionStatus();

// ========================
//  Service Worker (cache basemaps + OSRM)
// ========================
if ('serviceWorker' in navigator) {
  const swCode = `
    self.addEventListener('fetch', (event) => {
      const u = event.request.url;
      if (u.includes('basemaps.cartocdn.com') ||
          u.includes('arcgisonline.com') ||
          u.includes('router.project-osrm.org')) {
        event.respondWith(
          caches.match(event.request).then((r) =>
            r || fetch(event.request).then((resp) => {
              const c = resp.clone();
              caches.open('map-tiles-v1').then((cache) => cache.put(event.request, c));
              return resp;
            })
          )
        );
      }
    });
  `;
  const blob = new Blob([swCode], { type: 'application/javascript' });
  const swUrl = URL.createObjectURL(blob);
  navigator.serviceWorker.register(swUrl).catch(() =>
    console.log('Service Worker non disponible, la carte reste fonctionnelle')
  );
}

// ========================
//  Routage "Aller au départ"
// ========================
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// ===========================================================================
// 🔧 FONCTION MODIFIÉE : Calcul du temps de trajet
// ===========================================================================
function calculateWalkingRoute(startLat, startLng, endLat, endLng) {
  const simpleDistance = calculateDistance(startLat, startLng, endLat, endLng);

  if (simpleDistance > 100) {
    console.warn(`Distance (${simpleDistance}km) > 100km. Forçage du mode estimation.`);
    return Promise.reject(new Error('Distance trop grande pour un piéton'));
  }

  const url = `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true&alternatives=false`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Erreur réseau OSRM');
      return response.json();
    })
    .then((data) => {
      if (data && data.routes && data.routes.length > 0) {
         let route = data.routes[0];
         
         // 🔧 MODIFICATION 1 : On ralentit le rythme (+30% de temps)
         route.duration = route.duration * 7,2;
         
         return route;
      }
      throw new Error('Aucun itinéraire OSRM trouvé');
    })
    .catch((error) => {
      console.warn('Passage au mode estimation:', error.message);
      const distance = calculateDistance(startLat, startLng, endLat, endLng);
      
      // 🔧 MODIFICATION 2 : 15 minutes par km au lieu de 12
      const duration = distance * 15 * 60;
      
      return {
        geometry: { coordinates: [[startLng, startLat], [endLng, endLat]] },
        distance: distance * 1000,
        duration,
        fallback: true
      };
    });
}

function displayRoute(route) {
  if (routingControl) map.removeLayer(routingControl);
  const coordinates = (route.geometry?.coordinates || []).map(([lng, lat]) => [lat, lng]);
  if (!coordinates.length) return;

  const routeStyle = route.fallback
    ? { color: '#f39c12', weight: 4, opacity: 0.8, dashArray: '15, 10' }
    : { color: '#2196F3', weight: 5, opacity: 0.9, dashArray: '8, 4' };

  routingControl = L.polyline(coordinates, routeStyle).addTo(map);
  const bounds = L.latLngBounds(coordinates);
  map.fitBounds(bounds, { padding: [30, 30] });

  const distance = (route.distance / 1000).toFixed(2);
  const duration = Math.round(route.duration / 60);
  const routeType = route.fallback ? '📏 Distance estimée' : '🚶‍♂️ Itinéraire piéton optimisé';

  const routeInfo = `
    <div style="text-align:center; padding:15px; min-width:200px;">
      <h3>${routeType}</h3>
      <p style="margin:8px 0;"><strong>📏 Distance :</strong> ${distance} km</p>
      <p style="margin:8px 0;"><strong>⏱️ Temps estimé :</strong> ${duration} min</p>
      ${route.fallback ? '<p style="color:#f39c12; font-size:.9em; margin-top:10px;">⚠️ Estimation approximative</p>' : ''}
    </div>`;
  if (userMarker) userMarker.bindPopup(routeInfo).openPopup();
}

// Bouton "Aller au départ"
document.getElementById('startBtn').addEventListener('click', function () {
  const firstPoint = pointsInteret[0];
  const button = this;
  const finishReset = () => {
    button.disabled = false;
    setTimeout(() => {
      button.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
      button.textContent = '🏁 Aller au Départ';
    }, 4000);
  };

  if (userMarker) {
    const userPosition = userMarker.getLatLng();
    button.textContent = '🔄 Calcul du meilleur itinéraire...';
    button.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
    button.disabled = true;

    calculateWalkingRoute(
      userPosition.lat, userPosition.lng, firstPoint.coords[0], firstPoint.coords[1]
    )
      .then((route) => {
        if (route) {
          displayRoute(route);
          button.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
          button.textContent = route.fallback ? '📏 Estimation affichée' : '✅ Itinéraire optimal affiché';
          setTimeout(() => { if (markers[0]) markers[0].openPopup(); }, 2000);
        } else {
          map.setView(firstPoint.coords, 18);
          if (markers[0]) markers[0].openPopup();
          button.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
          button.textContent = '❌ Erreur - Point affiché';
        }
      })
      .catch(() => {
        map.setView(firstPoint.coords, 18);
        if (markers[0]) markers[0].openPopup();
        button.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        button.textContent = '❌ Erreur - Point affiché';
      })
      .finally(finishReset);

  } else {
    const shouldLocate = confirm(
      "Pour calculer l'itinéraire le plus rapide, nous devons connaître votre position actuelle.\n\nVoulez-vous activer la géolocalisation ?"
    );
    if (shouldLocate) {
      button.textContent = '📍 Localisation en cours...';
      button.style.background = 'linear-gradient(45deg, #9b59b6, #8e44ad)';

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          if (userMarker) map.removeLayer(userMarker);
          userMarker = L.marker([lat, lon], {
            icon: L.divIcon({
              className: 'location-marker',
              html: '<span>📍</span>',
              iconSize: [36, 36],
              iconAnchor: [18, 18]
            })
          }).addTo(map);

          button.textContent = '🔄 Position trouvée, calcul itinéraire...';
          setTimeout(() => { button.click(); }, 500);
        },
        () => {
          button.style.background = 'linear-gradient(45deg, #e67e22, #d35400)';
          button.textContent = '⚠️ Géolocalisation échouée';
          setTimeout(() => {
            map.setView(firstPoint.coords, 18);
            if (markers[0]) markers[0].openPopup();
            button.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
            button.textContent = '🏁 Aller au Départ';
          }, 2000);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
      );
    } else {
      map.setView(firstPoint.coords, 18);
      if (markers[0]) markers[0].openPopup();
      button.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
      button.textContent = '📍 Premier point affiché';
      setTimeout(() => {
        button.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
        button.textContent = '🏁 Aller au Départ';
      }, 2000);
    }
  }
});

// ========================
//  Bascules Plan/Satellite
// ========================
function updateButtonStates(activeId) {
  ['streetBtn', 'satelliteBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (id === activeId) btn.classList.add('active'); else btn.classList.remove('active');
  });
}
document.getElementById('streetBtn').addEventListener('click', function () {
  if (map.hasLayer(satelliteMap)) map.removeLayer(satelliteMap);
  if (!map.hasLayer(streetMap)) map.addLayer(streetMap);
  updateButtonStates('streetBtn');
});
document.getElementById('satelliteBtn').addEventListener('click', function () {
  if (map.hasLayer(streetMap)) map.removeLayer(streetMap);
  if (!map.hasLayer(satelliteMap)) map.addLayer(satelliteMap);
  updateButtonStates('satelliteBtn');
});

// ========================
//  Modal POI
// ========================
const modal = document.getElementById('poiModal');
const listBtn = document.getElementById('listBtn');
const closeBtn = document.getElementsByClassName('close')[0];
const poiList = document.getElementById('poiList');

function generatePOIList() {
  poiList.innerHTML = '';
  pointsInteret.forEach((point, index) => {
    const poiItem = document.createElement('div');
    poiItem.className = 'poi-item';
    poiItem.innerHTML = `
      <div style="display:flex; align-items:flex-start;">
        <div class="poi-number">${index + 1}</div>
        <div>
          <div class="poi-title">${point.title}</div>
        </div>
      </div>`;
    poiItem.addEventListener('click', () => {
      map.setView(point.coords, 17);
      if (markers[index]) markers[index].openPopup();
      modal.style.display = 'none';
      listBtn.classList.remove('active');
    });
    poiList.appendChild(poiItem);
  });
}
listBtn.addEventListener('click', function () {
  generatePOIList();
  modal.style.display = 'block';
  this.classList.add('active');
});
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
  listBtn.classList.remove('active');
});
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    listBtn.classList.remove('active');
  }
});

// ========================
//  Ma position
// ========================
document.getElementById('locateBtn').addEventListener('click', function () {
  const self = this;
  if (!navigator.geolocation) {
    alert('La géolocalisation n\'est pas supportée par votre navigateur.');
    return;
  }
  self.textContent = '🔄 Localisation...';

  const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 };
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.marker([lat, lon], {
        icon: L.divIcon({
          className: 'location-marker',
          html: '<span>📍</span>',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        })
      }).addTo(map);

      const statusText = isOnline ? "📍 Vous êtes ici !" : "📍 Vous êtes ici ! (Position en cache)";
      userMarker.bindPopup(statusText).openPopup();
      map.setView([lat, lon], 16);

      self.textContent = '📍 Ma Position';

      const startBtn = document.getElementById('startBtn');
      startBtn.textContent = '🚶‍♂️ Itinéraire optimal vers le Départ';
      startBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
      setTimeout(() => {
        startBtn.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
        startBtn.textContent = '🏁 Aller au Départ';
      }, 3000);
    },
    () => {
      let errorMessage = "Impossible d'obtenir votre position.";
      errorMessage += isOnline
        ? ' Vérifiez vos paramètres de géolocalisation.'
        : ' Vérifiez votre connexion et vos paramètres de géolocalisation.';
      alert(errorMessage);
      self.textContent = '📍 Ma Position';
    },
    options
  );
});

// Effet "pop" au démarrage
setTimeout(() => {
  markers.forEach((marker, index) => {
    setTimeout(() => {
      const el = marker.getElement();
      if (el) {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
      }
    }, index * 200);
  });
}, 1000);

// ========================
//  Tutoriel
// ========================
let currentStep = 1;
const totalSteps = 10;

const welcomeModal = document.getElementById('welcomeModal');
const skipBtn = document.getElementById('skipBtn');
const nextBtn = document.getElementById('nextBtn');

window.addEventListener('load', () => {
  setTimeout(() => {
    welcomeModal.style.display = 'flex';
    welcomeModal.setAttribute('aria-hidden', 'false');
  }, 500);
});

function closeWelcomeModal() {
  welcomeModal.style.opacity = '0';
  setTimeout(() => {
    welcomeModal.style.display = 'none';
    welcomeModal.style.opacity = '1';
    welcomeModal.setAttribute('aria-hidden', 'true');
  }, 300);
}

function nextStep() {
  if (currentStep < totalSteps) {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;
    document.getElementById(`step${currentStep}`).style.display = 'block';
    updateProgressDots();
    if (currentStep === totalSteps) {
      nextBtn.textContent = 'Commencer';
      nextBtn.classList.add('btn-finish');
    }
  } else {
    closeWelcomeModal();
  }
}

function updateProgressDots() {
  document.querySelectorAll('.progress-dot').forEach((dot, index) => {
    if (index < currentStep) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

skipBtn.addEventListener('click', closeWelcomeModal);
nextBtn.addEventListener('click', nextStep);

welcomeModal.addEventListener('click', (e) => { if (e.target === welcomeModal) closeWelcomeModal(); });

document.addEventListener('keydown', (e) => {
  if (welcomeModal.style.display === 'flex') {
    if (e.key === 'Escape') closeWelcomeModal();
    else if (e.key === 'ArrowRight' || e.key === 'Enter') nextStep();
  }
});

// Bouton "Aide" pour relancer le tutoriel
document.getElementById('helpBtn').addEventListener('click', function () {
  currentStep = 1;
  for (let i = 1; i <= totalSteps; i++) {
    document.getElementById(`step${i}`).style.display = (i === 1) ? 'block' : 'none';
  }
  updateProgressDots();
  nextBtn.textContent = 'Suivant';
  nextBtn.classList.remove('btn-finish');

  welcomeModal.style.display = 'flex';
  welcomeModal.style.opacity = '1';
  welcomeModal.setAttribute('aria-hidden', 'false');

  this.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
  this.textContent = '✅ Tutoriel ouvert !';
  setTimeout(() => {
    this.style.background = 'linear-gradient(45deg, #9b59b6, #8e44ad)';
    this.textContent = '❓ Aide';
  }, 2000);
});

// ===========================================
// CRÉER LES MARQUEURS AVEC BOUTONS
// ===========================================

function createNumberedIcon(number) {
    return L.divIcon({
        className: 'numbered-marker',
        html: `<span>${number}</span>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });
}

function addMarkers() {
    // Définir les liens "En savoir plus" pour chaque étape
      const liensEtapes = {
        0: null, // 🏁 Place Kennedy - pas de lien
        1: "https://www.chateau-angers.fr/", // 1. Château d'Angers
        2: null, // 2. Promenade du Bout du Monde - pas de lien
        3: "https://www.angers.fr/vivre-a-angers/culture/patrimoine/angers-patrimoine/ressources/fiches-patrimoine/laissez-vous-conter-la-cathedrale-saint-maurice/index.html", // 3. Cathédrale
        4: "https://fr.wikipedia.org/wiki/Maison_d%27Adam", // 4. Maison d'Adam
        5: null, // 5. Rue Saint-Laud - pas de lien
        6: "https://fr.wikipedia.org/wiki/Mus%C3%A9um_des_sciences_naturelles_d%27Angers", // 6. Muséum
        7: "https://www.angers.fr/vivre-a-angers/culture/patrimoine/angers-patrimoine/ressources/fiches-patrimoine/laissez-vous-conter-les-jardins/index.html", // 7. Jardin des Plantes
        8: null, // 8. Jardin du Mail - pas de lien
        9: "https://www.produitenanjou.fr/project/benoit-chocolats/", // 9. Benoit Chocolats
        10: "https://quernon.fr/" // 10. Maison du Quernon
      };

    pointsInteret.forEach((point, index) => {
        // Si c'est la Place Kennedy (index 0), on affiche "🏁" au lieu d'un numéro
        const markerLabel = (index === 0) ? '🏁' : index+1;
        
        const marker = L.marker(point.coords, {
            icon: createNumberedIcon(markerLabel)
        }).addTo(map);
        
        // Ajuster le numéro d'étape dans le popup
        const etapeNumero = (index === 0) ? 'Départ' : `Étape ${index+1}`;
        
        // Vérifier si un lien existe pour cette étape
        const lienSavoirPlus = liensEtapes[index];
        
        // Créer le bouton "En savoir plus" seulement si un lien existe
        const boutonSavoirPlus = lienSavoirPlus ? `
            <button 
                onclick="window.open('${lienSavoirPlus}', '_blank')" 
                style="
                    background: linear-gradient(45deg, #3498db, #2980b9);
                    color: white;
                    border: none;
                    padding: 15px 15px;
                    border-radius: 15px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 15px;
                    box-shadow: 0 4px 10px rgba(52,152,219,0.3);
                    transition: all 0.3s ease;
                "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(52,152,219,0.5)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(52,152,219,0.3)'"
            >📖 En savoir plus</button>
        ` : '';
        
        const popupContent = `
    <div class="popup-content">
        <img src="${point.image}" alt="${point.title}" onerror="this.src='${point.fallbackImage}'">
        ${point.imageCredit ? '<p style="font-size: 0.75em; color: #7f8c8d; margin: 5px 0 10px 0; text-align: center; line-height: 1.3;">' + point.imageCredit + '</p>' : ''}
        <h3>${etapeNumero} : ${point.title}</h3>
        <div style="white-space: pre-line; line-height: 1.6; text-align: justify; margin-bottom: 15px;">${point.description}</div>
        
        <div style="
            display: flex;
            justify-content: ${lienSavoirPlus ? 'space-between' : 'center'};
            align-items: center;
            margin-top: 15px;
            gap: 10px;
        ">
            <button 
                onclick="window.open('odd.html#etape-${index + 1}', '_blank')"
                style="
                    background: linear-gradient(45deg, #27ae60, #2ecc71);
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 14px;
                    box-shadow: 0 4px 10px rgba(39,174,96,0.3);
                    transition: all 0.3s ease;
                "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(39,174,96,0.5)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(39,174,96,0.3)'"
            >
                🌍 ODD
            </button>

            ${boutonSavoirPlus}
        </div>
    </div>
`;
        
        marker.bindPopup(popupContent, { 
            maxWidth: 500,
            minWidth: 420,
            className: 'custom-popup' 
        });
        markers.push(marker);
    });
    
    console.log('✅', pointsInteret.length, 'marqueurs ajoutés avec boutons conditionnels');
}
                
/// ========================
//  Questionnaire de satisfaction
// ========================
document.getElementById('feedbackBtn').addEventListener('click', () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfYzdLwLvkTOnPPW29s2pfCah87YtkYABaI0tx6XbJ43JWd7A/viewform', '_blank');
});

// ========================
//  Modal "Nous"
// ========================

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  const nousModal = document.getElementById('nousModal');
  const nousBtn = document.getElementById('nousBtn');
  const closeNousBtn = document.getElementById('closeNous');

  // Vérifier que les éléments existent
  if (nousBtn && nousModal && closeNousBtn) {
    
    // Ouvrir le modal
    nousBtn.addEventListener('click', function () {
      nousModal.style.display = 'block';
      nousModal.setAttribute('aria-hidden', 'false');
      this.classList.add('active');
    });

    // Fermer avec la croix
    closeNousBtn.addEventListener('click', function () {
      nousModal.style.display = 'none';
      nousModal.setAttribute('aria-hidden', 'true');
      nousBtn.classList.remove('active');
    });

    // Fermer en cliquant en dehors du modal
    window.addEventListener('click', function (event) {
      if (event.target === nousModal) {
        nousModal.style.display = 'none';
        nousModal.setAttribute('aria-hidden', 'true');
        nousBtn.classList.remove('active');
      }
    });
  }
});
