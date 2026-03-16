import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';

export default function ChannelList({ channels, onChannelSelect }) {
  return (
    <FlatList
      data={channels}
      keyExtractor={item => item.url}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onChannelSelect(item)}
          style={{ padding: 8, borderBottomWidth: 1 }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}