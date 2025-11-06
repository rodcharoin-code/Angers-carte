// ===========================================
// LANCEMENT
// ===========================================

addMarkers();
addCircuitFromGeoJSON();

// 🎯 FORCER LE RECALCUL DE LA CARTE APRÈS CHARGEMENT
setTimeout(() => {
    map.invalidateSize();
    console.log('🔄 Recalcul initial de la carte');
}, 1000);

console.log('✅ Carte interactive chargée avec le nouveau tracé piéton');
L.divIcon({
  className: 'numbered-marker',
  html: `<span>${number}</span>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

// Marqueur de localisation
L.divIcon({
  className: 'location-marker',
  html: '<span>📍</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

const pointsInteret = [
  /* 1 */ { coords:[47.47063117697629,-0.5588421261128192], ... }, // Château
  /* 2 */ { coords:[47.47043794223846,-0.5552633179461097], ... }, // Cathédrale
  /* 3 */ { coords:[47.47037651735204,-0.5541144593090486], ... }, // Maison d’Adam
  /* 4 */ { coords:[47.46846307813217,-0.5542979002335384], ... }, // Quernon
  /* 5 */ { coords:[47.46893760445775,-0.5532987947999836], ... }, // Benoit
  /* 6 */ { coords:[47.4707751897992,-0.5472399077060537], ... }  // Jardin du Mail
  
  L.polyline(circuitCoords, {
  color:'#e74c3c', weight:4, opacity:.8,
  dashArray:'10,5', className:'circuit-line',
  smoothFactor: 1.2
}).addTo(map);
           async function routeORS(points) {
  const body = {
    coordinates: points.map(p => [p.lng, p.lat]), // ORS attend [lon, lat]
    instructions: false
  };
  const res = await fetch(
    'https://api.openrouteservice.org/v2/directions/foot-walking/geojson',
    {
      method: 'POST',
      headers: {
        'Authorization': 'YOUR_ORS_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
  return res.json();
}

const pts = [
  { lat: 47.4716, lng: -0.5542 },
  { lat: 47.4725, lng: -0.5551 },
  { lat: 47.4732, lng: -0.5519 }
];

routeORS(pts).then(geojson => {
  L.geoJSON(geojson, {
    style: { color: '#e74c3c', weight: 5, className: 'circuit-line' }
  }).addTo(map);
});