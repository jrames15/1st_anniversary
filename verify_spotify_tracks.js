const https = require('https');
const url = 'https://www.mystreamcount.com/artist/5069JTmv5ZDyPeZaCCXiCg';
const headers = { 'User-Agent': 'Mozilla/5.0' };
https.get(url, { headers }, res => {
  let data = '';
  res.on('data', chunk => data += chunk.toString());
  res.on('end', () => {
    const regex = /<a[^>]+href="https:\/\/www\.mystreamcount\.com\/track\/([A-Za-z0-9]{22})"[^>]*>([^<]+)<\/a>/g;
    const tracks = [];
    let match;
    while ((match = regex.exec(data)) !== null) {
      tracks.push({ id: match[1], title: match[2].trim() });
    }
    console.log(JSON.stringify(tracks, null, 2));
  });
}).on('error', err => {
  console.error(err.message);
});
