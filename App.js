import 'react-native-gesture-handler';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import dataOverview from './Screens/Screen1Overview';
import getAllCharts from './charts';
import getWarningLevelDataAPI from './getCoronaWarningLevel';
import {MainStackNavigator} from './stackNavigation';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Overview"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        shifting={true}
        barStyle={{backgroundColor: '#694fad'}}>
        <Tab.Screen
          name="Overview"
          component={dataOverview}
          options={{
            tabBarLabel: 'Overview',
            tabBarColor: '#226dd3',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="database-check"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Charts"
          component={getAllCharts}
          options={{
            tabBarLabel: 'Charts',
            tabBarColor: '#008787',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="chart-line"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WarnLevel"
          component={getWarningLevelDataAPI}
          options={{
            tabBarLabel: 'WarnLevel',
            tabBarColor: '#d78700',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="map-marker-alert-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Modal"
          component={MainStackNavigator}
          options={{
            tabBarLabel: 'Modal',
            tabBarColor: '#8d4bba',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="thought-bubble"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
