export function parseM3U(text) {
  const lines = text.split('\n');
  const channels = [];
  let current = {};
  for (let line of lines) {
    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.*)$/);
      current = { name: nameMatch ? nameMatch[1] : 'Unknown' };
    } else if (line.startsWith('http')) {
      current.url = line;
      channels.push({ ...current });
      current = {};
    }
  }
  return channels;
}