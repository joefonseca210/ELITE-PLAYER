import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Image } from 'react-native';
import { parseM3U } from '../utils/m3uParser';

export default function PlaylistScreen({ navigation }) {
  const [url, setUrl] = useState('');

  function importPlaylist() {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        const playlist = parseM3U(data);
        if (!playlist.length) Alert.alert('No channels found');
        else navigation.navigate('Channels', { channels: playlist });
      })
      .catch(() => Alert.alert('Failed to load playlist'));
  }

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Image source={require('../assets/elite-logo.png')} style={{ width: 300, height: 200, marginBottom: 20 }} resizeMode="contain" />
      <TextInput
        placeholder="IPTV playlist URL"
        value={url}
        onChangeText={setUrl}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8, width: '100%' }}
      />
      <Button title="Import Playlist" onPress={importPlaylist} />
    </View>
  );
}