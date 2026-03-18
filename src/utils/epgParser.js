export function parseEPG(xml) {
  const matches = [
    ...xml.matchAll(
      /<programme.*?channel="(.*?)".*?start="(.*?)".*?stop="(.*?)".*?>([\s\S]*?)<\/programme>/g
    ),
  ];
  return matches.map((match) => ({
    channel: match[1],
    start: match[2],
    stop: match[3],
    title: (match[4].match(/<title>(.*?)<\/title>/) || [])[1] || 'No title',
  }));
}
