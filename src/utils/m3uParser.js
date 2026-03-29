export function parseM3U(text) {
  const lines = text.split('\n');
  const channels = [];
  let current = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#EXTINF')) {
      const nameMatch = trimmed.match(/,(.*)$/);
      current = { name: nameMatch ? nameMatch[1].trim() : 'Unknown' };
    } else if (trimmed.startsWith('http')) {
      current.url = trimmed;
      channels.push({ ...current });
      current = {};
    }
  }
  return channels;
}
