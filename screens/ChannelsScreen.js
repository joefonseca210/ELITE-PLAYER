import React from 'react';
import { View } from 'react-native';
import ChannelList from '../components/ChannelList';

export default function ChannelsScreen({ route, navigation }) {
  const channels = route.params?.channels ?? [];
  return (
    <View style={{ flex: 1 }}>
      <ChannelList channels={channels} onChannelSelect={(channel) => navigation.navigate('Player', { channel })} />
    </View>
  );
}