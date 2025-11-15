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
        description: "Point de départ du circuit touristisme durable d'Angers.",
        image: "",
        etapeId: "etape-1"
    },
  
    // ÉTAPE 1 : Château d'Angers
    { 
      coords: [47.47063117697629, -0.5588421261128192],
        title: "Château d'Angers",
        description: `Le Château d'Angers est un site emblématique de la ville, véritable témoin de son histoire avec une valeur patrimoniale importante. Vous y trouverez La Tapisserie de l'Apocalypse, inscrite au registre Mémoire du Monde de l'UNESCO depuis le 18 mai 2023.

En lien constant avec la Ligue pour la Protection des Oiseaux (LPO), le Château d'Angers œuvre pour la préservation de l'environnement. Depuis 2011, année du premier inventaire de la faune et de la flore, le site est passé de 99 à 220 espèces observées en 2021.

La flore est très présente au sein du site avec 150 espèces recensées. Les orchidées, par exemple, sont représentées par l'ophrys abeille, l'orchis singe et l'orchis bouc. Des espèces de fougères sont également présentes, tout particulièrement au niveau des remparts. 

Ce monument abrite pas moins de 39 espèces d'oiseaux. Le martinet noir ou encore le moineau domestique profitent des cavités présentes dans le bâti pour y nicher. Le crécerelle niche également sur le site. D'autres espèces, comme la chouette hulotte  ou l'effraie des clochers peuvent être observées durant leurs activités de chasse. En hiver, les cavités des remparts du château servent à l'hibernation pour des pipistrelles communes et des oreillards.`,
        image: "https://rodcharoin-code.github.io/Angers-carte/images/chateau.jpg",
        etapeId: "etape-2"
    },
    
    // ÉTAPE 2 : Promenade du Bout du Monde
    {
        coords: [47.471061, -0.559224],
        title: "Promenade du Bout du Monde",
        description: `Située entre le château et la cité historique, la Promenade du Bout du Monde est un lieu emblématique de la ville d'Angers. Anciennement la voie principale d'entrée au château d'Angers, elle offre aujourd'hui une vue imprenable sur la Maine et le quartier de la Doutre. 

Entièrement réaménagée et inaugurée le 24 juin 2018, la promenade a été repensée pour favoriser les mobilités douces et la biodiversité. La piétonnisation du site et la plantation de plus de 7 000 végétaux issus de 128 espèces différentes, majoritairement locales et mellifères, ont transformé cet espace d'origine très minéral.`,
        image: "",
        etapeId: "etape-3"
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
        etapeId: "etape-4"
    },
    
    // ÉTAPE 4 : Maison d'Adam
    {
        coords: [47.47037651735204, -0.5541144593090486],
        title: "La Maison d'Adam",
        description: `Au cœur du centre historique, sur la place Sainte-Croix, la Maison d'Adam est l'un des trésors les plus emblématiques d'Angers. Construite vers 1491, cette demeure illustre l'architecture médiévale angevine. Ses façades sculptées, ses colombages et ses figures fantastiques témoignent du savoir-faire des artisans de la fin du XVe siècle.

Classée Monument historique depuis 1922, la Maison d'Adam doit son nom à une sculpture représentant Adam et Ève sur sa façade principale. Longtemps habitée par la confrérie des selliers-bourreliers, elle abrite désormais la Maison des Artisans qui valorise les métiers d'art et la création locale.

Ce lieu redynamise le centre-ville par des activités respectueuses et locales, fondées sur la transmission des savoir-faire et la mise en valeur du patrimoine bâti.`,
        image: "",
        etapeId: "etape-5"
    },
    
    // ÉTAPE 5 : Rue Saint-Laud
    {
        coords: [47.471629, -0.553788],
        title: "Rue Saint-Laud",
        description: `La rue Saint-Laud relie le cœur historique d'Angers à la gare, il s'agit de l'une des plus anciennes artères de la ville. Elle conserve le tracé du quartier marchand médiéval, autrefois animé par les auberges et ateliers d'artisans.

Aujourd'hui entièrement réaménagée, la rue Saint-Laud s'inscrit dans la dynamique de revitalisation durable du centre-ville. Les travaux menés par la ville d'Angers ont permis d'élargir les espaces piétons, de végétaliser les trottoirs et de valoriser les façades patrimoniales tout en soutenant les commerces locaux.`,
        image: "",
        etapeId: "etape-8"
    },
    
    // ÉTAPE 6 : Muséum des Sciences Naturelles
    {
      coords: [47.47349436796099, -0.5464154666626944],
        title: "Muséum des Sciences Naturelles",
        description: `Créé en 1796, le Muséum des Sciences Naturelles d'Angers abrite plus de 600 000 spécimens : animaux naturalisés, insectes, fossiles, squelettes ou encore minéraux. Véritable lieu de savoir et de curiosité, il invite le visiteur à explorer la richesse et la diversité du monde vivant.

Les différentes expositions permanentes et temporaires abordent des thématiques actuelles telles que le réchauffement climatique, la disparition des espèces, la biodiversité ou l'impact de l'Homme dans les écosystèmes. 

Le musée s'inscrit dans une démarche de sensibilisation du public à la protection de la nature et à la valorisation du patrimoine naturel et s'est donné cinq missions principales : la conservation, la diffusion des connaissances, l'expertise, la pédagogie et la recherche scientifique.`,
        image: "",
        etapeId: "etape-10"
    },
    
    // ÉTAPE 7 : Jardin des Plantes
    {
      coords: [47.47411016710265, -0.5449099946854348],
        title: "Le Jardin des Plantes",
        description: `Fondé au XVIIIᵉ siècle, au-delà des remparts, le Jardin des Plantes d'Angers fut le premier jardin botanique de la ville, initialement consacré à la recherche. Au fil des années, grâce à des échanges internationaux, la diversité botanique augmente. En 1901 et 1905, suite à une tempête dévastatrice, le jardin est entièrement rénové par Édouard André, puis accessible au public.

Situé au cœur de la ville, ce jardin à l'anglaise offre de belles allées, des statues au style romantique, ainsi qu'un bassin agrémenté de petites cascades et de jeux de miroir. Il abrite une riche diversité végétale, entre arbres centenaires, massifs floraux et bosquets. La faune y est également présente, avec poules, lapins, chèvres, cygnes et parfois des écureuils.`,
        image: "",
        etapeId: "etape-11"
    },
    
    // ÉTAPE 8 : Jardin du Mail
    {
        coords: [47.47053649104745, -0.5461446578724273],
        title: "Le Jardin du Mail",
        description: `Accolée au Jardin du Mail, l'Avenue Jeanne-d'Arc illustre parfaitement la volonté de végétalisation de l'espace urbain angevin. Inaugurée le 25 avril 2018 après un an de travaux, elle constitue l'un des projets phares du plan global de végétalisation de la ville.

La rénovation complète de l'avenue a permis d'optimiser son éclairage grâce à l'installation de 36 lanternes ainsi que de 67 projecteurs orientés vers les prairies, l'allée centrale et le square. La végétation occupe désormais une place majeure, avec la plantation de 154 tilleuls à petites feuilles, 26 arbres fruitiers, 46 platanes, 810 hortensias et pas moins de 10 000 crocus.

Du mobilier urbain est venu compléter l'aménagement, comprenant 33 fauteuils et 10 bancs répartis le long de l'avenue. Avec plus de 11 600 m² végétalisés, soit plus de la moitié de la surface totale de cette dernière, l'espace alterne entre zones enherbées et espaces de détente en bordure, tandis que la large allée centrale permet un partage entre piétons et cyclistes.`,
        image: "",
        etapeId: "etape-9"
    },
    
    // ÉTAPE 9 : Benoit Chocolats
    {
      coords: [47.46891297404408, -0.553276794250633],
        title: "Benoit Chocolats Angers",
        description: `La chocolaterie confectionne ses créations à la main dans son atelier situé aux Ponts-de-Cé, près d'Angers, en perpétuant un savoir-faire artisanal. Son produit emblématique, Le Caramandes®, a valu à l'entreprise, fondée en 1975 à Angers, de nombreuses distinctions tant au niveau national qu'international. Créé en 2008, il s'agit d'une "fine feuille triangulaire, composée d'amandes effilées, torréfiées, caramélisées au beurre salé, puis enrobée d'un chocolat finement sélectionné".`,
        image: "",
        etapeId: "etape-7"
    },
    
    // ÉTAPE 10 : Maison du Quernon d'Ardoise
    {
      coords: [47.46846307813217, -0.5542979002335384],
        title: "La Maison du Quernon d'Ardoise",
        description: `La Maison du Quernon d'Ardoise, chocolaterie angevine, est célèbre pour sa spécialité lancée en 1996, le Quernon d'Ardoise®, évoquant les toits d'ardoise typiques de l'Anjou. Enrobée de chocolat bleu, cette gourmandise est composée de nougatine caramélisée aux amandes et aux noisettes.`,
        image: "",
        etapeId: "etape-6"
    }
];

// ===========================================
// PARKINGS ANGERS - Données en temps réel
// ===========================================

let parkingMarkers = [];

// Icône personnalisée pour les parkings
function createParkingIcon(available, total) {
    const percentage = (available / total) * 100;
    let color = '#27ae60'; // Vert si > 30%
    
    if (percentage < 10) color = '#e74c3c'; // Rouge si < 10%
    else if (percentage < 30) color = '#f39c12'; // Orange si < 30%
    
    return L.divIcon({
        className: 'parking-marker',
        html: `<div style="
            background: ${color};
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 20px;
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.4);
            cursor: pointer;
            transition: transform 0.2s;
        ">🅿️</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });
}

// Récupérer les données des parkings
async function loadParkingData() {
    try {
        console.log('🅿️ Tentative de récupération des données parkings...');
        
        const response = await fetch('https://data.angers.fr/api/explore/v2.1/catalog/datasets/parking-angers/records?limit=100');
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('📦 Réponse API complète:', data);
        console.log('🅿️ Données parkings récupérées:', data.results?.length || 0, 'parkings');
        
        if (!data.results || data.results.length === 0) {
            console.warn('⚠️ Aucun parking trouvé dans les données');
            return;
        }
        
        // Effacer les anciens marqueurs
        parkingMarkers.forEach(marker => map.removeLayer(marker));
        parkingMarkers = [];
        
        data.results.forEach((parking, index) => {
            console.log(`Parking ${index}:`, parking);
            
            // Vérifier différentes structures possibles
            const coords = parking.grp_coordonnees?.coordinates || 
                          parking.coordonnees?.coordinates ||
                          parking.geo_point_2d;
            
            if (!coords) {
                console.warn(`❌ Pas de coordonnées pour:`, parking);
                return;
            }
            
            let lat, lon;
            
            // Gérer différents formats de coordonnées
            if (Array.isArray(coords)) {
                lon = coords[0];
                lat = coords[1];
            } else if (coords.lat && coords.lon) {
                lat = coords.lat;
                lon = coords.lon;
            } else {
                console.warn(`❌ Format de coordonnées inconnu:`, coords);
                return;
            }
            
            const nom = parking.grp_nom || parking.nom || parking.name || 'Parking sans nom';
            const disponible = parking.grp_disponible || parking.disponible || parking.available || 0;
            const exploitation = parking.grp_exploitation || parking.exploitation || parking.total || 0;
            
            console.log(`✅ Ajout parking: ${nom} - ${disponible}/${exploitation} places à [${lat}, ${lon}]`);
            
            // Horaires et tarifs
            const horaires = getHorairesParking(nom);
            const tarifs = getTarifParking(nom);
            
            const marker = L.marker([lat, lon], {
                icon: createParkingIcon(disponible, exploitation)
            });
            
            const popupContent = `
                <div class="popup-content" style="min-width: 280px;">
                    <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">
                        🅿️ ${nom}
                    </h3>
                    
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #3498db;">
                        <div style="font-weight: bold; margin-bottom: 5px; color: #2c3e50; font-size: 15px;">
                            📊 Places disponibles
                        </div>
                        <div style="font-size: 24px; font-weight: bold; color: #3498db;">
                            ${disponible} / ${exploitation}
                        </div>
                    </div>
                    
                    <div style="background: #fff8e1; padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #ffc107;">
                        <div style="font-weight: bold; margin-bottom: 8px; color: #2c3e50; font-size: 14px;">
                            🕐 Horaires
                        </div>
                        <div style="font-size: 13px; line-height: 1.6; color: #555;">
                            ${horaires}
                        </div>
                    </div>
                    
                    <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; border-left: 4px solid #4caf50;">
                        <div style="font-weight: bold; margin-bottom: 8px; color: #2c3e50; font-size: 14px;">
                            💰 Tarifs
                        </div>
                        <div style="font-size: 13px; line-height: 1.6; color: #555;">
                            ${tarifs}
                        </div>
                    </div>
                    
                    <div style="font-size: 11px; color: #95a5a6; margin-top: 12px; text-align: center;">
                        ⏱️ Données mises à jour en temps réel
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                maxWidth: 320,
                className: 'custom-popup'
            });
            
            // Effet hover
            marker.on('mouseover', function() {
                const element = this.getElement();
                if (element) element.style.transform = 'scale(1.15)';
            });
            
            marker.on('mouseout', function() {
                const element = this.getElement();
                if (element) element.style.transform = 'scale(1)';
            });
            
            marker.addTo(map);
            parkingMarkers.push(marker);
        });
        
        console.log('✅ TOTAL:', parkingMarkers.length, 'parkings ajoutés sur la carte');
        
    } catch (error) {
        console.error('❌ Erreur lors du chargement des parkings:', error);
        console.error('Détails:', error.message);
    }
}

// Fonction pour obtenir les horaires selon le parking
function getHorairesParking(nom) {
    const horairesSpeciaux = {
        'Saint-Laud 1': '24h/24 - 7j/7',
        'Saint-Laud 2': '24h/24 - 7j/7',
        'Mail': '24h/24 - 7j/7',
        'Ralliement': '24h/24 - 7j/7',
        'Molière': '24h/24 - 7j/7',
        'Fleur d\'Eau': '24h/24 - 7j/7',
        'Les Halles': '24h/24 - 7j/7',
        'Marengo': '24h/24 - 7j/7',
        'Haras': '24h/24 - 7j/7',
        'Bressigny': 'Lun-Sam : 7h-20h<br>Dimanche : Fermé'
    };
    
    for (let [key, value] of Object.entries(horairesSpeciaux)) {
        if (nom.toLowerCase().includes(key.toLowerCase())) {
            return value;
        }
    }
    
    return '24h/24 - 7j/7';
}

// Fonction pour obtenir les tarifs selon le parking
function getTarifParking(nom) {
    const tarifs = {
        'Saint-Laud 1': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Saint-Laud 2': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Mail': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Ralliement': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Molière': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Fleur d\'Eau': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Les Halles': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Marengo': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Haras': '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€',
        'Bressigny': '• 1h : 1,50€<br>• 2h : 3,00€<br>• Journée : 8,00€'
    };
    
    for (let [key, value] of Object.entries(tarifs)) {
        if (nom.toLowerCase().includes(key.toLowerCase())) {
            return value;
        }
    }
    
    return '• 1h : 1,50€<br>• 2h : 3,00€<br>• 3h : 4,50€<br>• Journée : 12,00€';
}

// Charger les parkings au démarrage
loadParkingData();

// Actualiser toutes les 2 minutes
setInterval(loadParkingData, 120000);

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
// LANCEMENT
// ===========================================

addMarkers();
addCircuitFromGeoJSON();
loadParkingData();

// 🎯 FORCER LE RECALCUL DE LA CARTE APRÈS CHARGEMENT
setTimeout(() => {
    map.invalidateSize();
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

function calculateWalkingRoute(startLat, startLng, endLat, endLng) {
  const url = `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true&alternatives=false`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Erreur réseau');
      return response.json();
    })
    .then((data) => {
      if (data && data.routes && data.routes.length > 0) return data.routes[0];
      throw new Error('Aucun itinéraire trouvé');
    })
    .catch((error) => {
      console.warn('OSRM indisponible, passage au mode estimation:', error.message);
      const distance = calculateDistance(startLat, startLng, endLat, endLng);
      const duration = distance * 12 * 60;
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
const totalSteps = 7;

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
        const markerLabel = (index === 0) ? '🏁' : index + 1;
        
        const marker = L.marker(point.coords, {
            icon: createNumberedIcon(markerLabel)
        }).addTo(map);
        
        // Ajuster le numéro d'étape dans le popup
        const etapeNumero = (index === 0) ? 'Départ' : `Étape ${index + 1}`;
        
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
                            padding: 15px 15px;
                            border-radius: 15px;
                            cursor: pointer;
                            font-weight: bold;
                            font-size: 15px;
                            box-shadow: 0 4px 10px rgba(39,174,96,0.3);
                            transition: all 0.3s ease;
                        "
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(39,174,96,0.5)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(39,174,96,0.3)'"
                    >🌍 ODD</button>

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
                
// ========================
//  Questionnaire de satisfaction
// ========================
document.getElementById('feedbackBtn').addEventListener('click', () => {
    document.getElementById('feedbackModal').style.display = 'flex';
});

document.getElementById('closeFeedback').addEventListener('click', () => {
    document.getElementById('feedbackModal').style.display = 'none';
});

// Fermer aussi en cliquant en dehors de la modal
document.getElementById('feedbackModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('feedbackModal')) {
        document.getElementById('feedbackModal').style.display = 'none';
    }
});
