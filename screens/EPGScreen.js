import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { parseEPG } from '../utils/epgParser';

export default function EPGScreen() {
  const [url, setUrl] = useState('');
  const [epg, setEpg] = useState([]);

  function fetchEPG() {
    fetch(url)
      .then(res => res.text())
      .then(data => setEpg(parseEPG(data)));
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="EPG XMLTV URL"
        value={url}
        onChangeText={setUrl}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Download EPG" onPress={fetchEPG} />
      <FlatList
        data={epg}
        keyExtractor={(e, i) => `${e.channel}-${i}`}
        renderItem={({ item }) => (
          <View style={{ padding: 4 }}>
            <Text>
              {item.channel}: {item.title} ({item.start} - {item.stop})
            </Text>
          </View>
        )}
      />
    </View>
  );
}