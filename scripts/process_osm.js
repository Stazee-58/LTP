const fs = require('fs');

console.log('Reading osm_raw.json...');
const data = JSON.parse(fs.readFileSync('scripts/osm_raw.json', 'utf8'));

// Build node map: id -> [lon, lat]
const nodes = new Map();
const ways = [];
const relations = [];

for (const el of data.elements) {
  if (el.type === 'node') {
    nodes.set(el.id, [Number(el.lon.toFixed(6)), Number(el.lat.toFixed(6))]);
  } else if (el.type === 'way') {
    ways.push(el);
  } else if (el.type === 'relation') {
    relations.push(el);
  }
}

console.log(`Nodes: ${nodes.size}, Ways: ${ways.length}, Relations: ${relations.length}`);

// Convert ways with building tag to Polygon features
const features = [];
let skipped = 0;

for (const way of ways) {
  if (!way.tags || !way.tags.building) continue;
  if (!way.nodes || way.nodes.length < 3) continue;

  const coords = [];
  let valid = true;
  for (const nid of way.nodes) {
    const pt = nodes.get(nid);
    if (!pt) {
      valid = false;
      break;
    }
    coords.push(pt);
  }

  if (!valid || coords.length < 3) {
    skipped++;
    continue;
  }

  // Ensure polygon is closed
  const first = coords[0];
  const last = coords[coords.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    coords.push(first);
  }

  // Determine height
  let height = 12; // default ~3-4 floors
  if (way.tags.height) {
    const h = parseFloat(way.tags.height);
    if (!isNaN(h) && h > 0) height = h;
  } else if (way.tags['building:levels']) {
    const lv = parseFloat(way.tags['building:levels']);
    if (!isNaN(lv) && lv > 0) height = lv * 3.3;
  } else {
    // Generate organic realistic height variation between 9m and 18m based on way id
    const pseudoRand = (way.id % 7);
    height = 10 + pseudoRand * 1.5; // 10, 11.5, 13, 14.5, 16, 17.5, 19
  }

  // Minimal properties to keep file size optimized
  features.push({
    type: 'Feature',
    properties: {
      id: way.id,
      h: Math.round(height * 10) / 10,
      name: way.tags.name || undefined,
    },
    geometry: {
      type: 'Polygon',
      coordinates: [coords],
    },
  });
}

console.log(`Converted ${features.length} buildings (skipped ${skipped})`);

const geojson = {
  type: 'FeatureCollection',
  features: features,
};

// Write to public/data/osm_buildings_3d.json
if (!fs.existsSync('public/data')) {
  fs.mkdirSync('public/data', { recursive: true });
}

fs.writeFileSync('public/data/osm_buildings_3d.json', JSON.stringify(geojson));
const stats = fs.statSync('public/data/osm_buildings_3d.json');
console.log(`Saved public/data/osm_buildings_3d.json: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
