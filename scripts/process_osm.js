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

  // Determine height based on real-world architecture in Hanoi
  let height = 8.5; // default ~2.5 floors for urban residential houses
  if (way.tags.height) {
    const h = parseFloat(way.tags.height);
    if (!isNaN(h) && h > 0) height = h;
  } else if (way.tags['building:levels']) {
    const lv = parseFloat(way.tags['building:levels']);
    if (!isNaN(lv) && lv > 0) height = lv * 3.2;
  } else {
    const bType = (way.tags.building || '').toLowerCase();
    const name = (way.tags.name || '').toLowerCase();
    if (bType === 'apartments' || name.includes('chung cư') || name.includes('tòa') || name.includes('c14')) {
      height = 36 + (way.id % 4) * 3; // 36m - 45m for apartment towers
    } else if (bType === 'university' || name.includes('đại học') || name.includes('học viện') || name.includes('t35')) {
      height = 24 + (way.id % 5) * 3;
    } else if (bType === 'hospital' || name.includes('bệnh viện') || name.includes('phòng khám')) {
      height = 20 + (way.id % 3) * 2;
    } else if (bType === 'school' || name.includes('trường') || name.includes('thcs') || name.includes('thpt') || name.includes('tiểu học')) {
      height = 15 + (way.id % 3) * 1.5; // 4-5 floors
    } else if (bType === 'commercial' || name.includes('vincom') || name.includes('siêu thị')) {
      height = 26;
    } else {
      // Ordinary residential houses: 7.0m to 10.0m (2-3 floors)
      // Keeps the 3D volume tightly grounded without severe camera perspective distortion
      const pseudoRand = (way.id % 4);
      height = 7.0 + pseudoRand * 1.0; // 7m, 8m, 9m, 10m
    }
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
