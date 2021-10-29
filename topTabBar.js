import * as React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import getPositiveCasesCountAPI from './Screen2PositiveCount';
import getFullyVaccinatedCountAPI from './Screen3Vaccination';
import getReffectiveValue from './Screen4Reff';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      style={{paddingTop: 30}}
      initialRouteName="PositiveCasesCount"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: '#005fff'},
      }}>
      <Tab.Screen
        name="PositiveCasesCount"
        component={getPositiveCasesCountAPI}
        options={{tabBarLabel: 'Cases'}}
      />
      <Tab.Screen
        name="Vaccination"
        component={getFullyVaccinatedCountAPI}
        options={{tabBarLabel: 'Vaccine'}}
      />
      <Tab.Screen
        name="REffective"
        component={getReffectiveValue}
        options={{tabBarLabel: 'REff'}}
      />
    </Tab.Navigator>
  );
}
export default function topTabBarCharts() {
  return <MyTabs />;
}
