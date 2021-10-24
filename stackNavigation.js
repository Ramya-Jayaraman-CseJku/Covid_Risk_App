import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import modelParamSelection from './modalParameters';
import Simulation from './modalSimulation';

const Stack = createStackNavigator();
function MyStack(){
    return(
<Stack.Navigator
      initialRouteName="Modal Parameters"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2C76F0',
        },
      }}>
      <Stack.Screen
        name="Modal Parameters"
        component={modelParamSelection}
        options={{
          backgroundColor: '#2C76F0',

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Simulation"
        component={Simulation}
        options={{
          backgroundColor: '#2C76F0',

          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
    );
}
export const MainStackNavigator = () => {
  return (
    <MyStack/>
  );
};
