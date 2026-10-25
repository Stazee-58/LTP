const https = require('https');
const fs = require('fs');

const bbox = '20.9820,105.8120,21.0125,105.8330';
const q = `[out:json][timeout:35];(way["building"](${bbox});relation["building"](${bbox}););out body;>;out skel qt;`;
const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(q);

console.log('Requesting Overpass API...');
const req = https.get(url, { headers: { 'User-Agent': 'LangTrongPhoMap/1.0' } }, (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Total bytes:', data.length);
    if (res.statusCode === 200) {
      try {
        const json = JSON.parse(data);
        console.log('Elements count:', json.elements?.length);
        fs.writeFileSync('scripts/osm_raw.json', data);
        console.log('Saved to scripts/osm_raw.json');
      } catch (e) {
        console.error('Parse error:', e.message);
      }
    } else {
      console.log('Response body preview:', data.slice(0, 300));
    }
  });
});

req.on('error', (e) => {
  console.error('Fetch error:', e.message);
});
