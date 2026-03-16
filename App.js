import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaylistScreen from './screens/PlaylistScreen';
import ChannelsScreen from './screens/ChannelsScreen';
import MoviesScreen from './screens/MoviesScreen';
import PlayerScreen from './screens/PlayerScreen';
import EPGScreen from './screens/EPGScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Playlist" component={PlaylistScreen} />
        <Tab.Screen name="Channels" component={ChannelsScreen} />
        <Tab.Screen name="Movies" component={MoviesScreen} />
        <Tab.Screen name="Player" component={PlayerScreen} />
        <Tab.Screen name="EPG" component={EPGScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}