import React from 'react';
import { View, Text } from 'react-native';
import Video from 'react-native-video';

export default function PlayerScreen({ route }) {
  const channel = route.params?.channel;
  if (!channel) return <Text>No channel selected</Text>;
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 8 }}>{channel.name}</Text>
      <Video
        source={{ uri: channel.url }}
        style={{ flex: 1 }}
        controls
        resizeMode="contain"
      />
    </View>
  );
}