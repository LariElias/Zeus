import React, { useState, useEffect } from 'react';
import { View, Platform, StatusBar, RefreshControl, ScrollView } from 'react-native'; // Importe o ScrollView e o RefreshControl
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from 'react-native-safe-area-context'; // Importe o SafeAreaView

import Home from "../my-app/src/pages/Home";
import Historic from "../my-app/src/pages/Historic";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o refresh

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = () => {
    setRefreshing(true); 

    // Lógica de recarregamento, pode ser a chamada de uma função de recarregamento de dados
    wait(2000).then(() => {
      setRefreshing(false); // Desativa o refresh
    });
  }

  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle='light-content' />
          <Navigator
            screenOptions={{
              tabBarActiveTintColor: "#ffffff",
              tabBarInactiveTintColor: "#818479",
              tabBarActiveBackgroundColor: "#818479",
              tabBarInactiveBackgroundColor: "#fafafc",
              tabBarLabelStyle: {
                fontSize: 18,
                position: "absolute",
                top: 15,
                bottom: 0,
                left: 0,
                right: 0,
                fontWeight: 'bold'
              },
              tabBarIconStyle: { display: "none" },
              headerShown: false
            }}
          >
            <Screen
              name="Form"
              component={Home}
              options={{ tabBarLabel: "Nova Ração" }}
            />
            <Screen
              name="List"
              component={Historic}
              options={{ tabBarLabel: "Histórico" }}
            />
          </Navigator>
        </SafeAreaView>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#818479' }}>
          <StatusBar backgroundColor="#1d1d2e" barStyle='light-content' />
          <Navigator
            screenOptions={{
              tabBarActiveTintColor: "#ffffff",
              tabBarInactiveTintColor: "#818479",
              tabBarActiveBackgroundColor: "#818479",
              tabBarInactiveBackgroundColor: "#fafafc",
              tabBarLabelStyle: {
                fontSize: 18,
                position: "absolute",
                top: 15,
                bottom: 0,
                left: 0,
                right: 0,
                fontWeight: 'bold'
              },
              tabBarIconStyle: { display: "none" },
              headerShown: false
            }}
          >
            <Screen
              name="Form"
              component={Home}
              options={{ tabBarLabel: "Nova Ração" }}
            />
            <Screen
              name="List"
              component={Historic}
              options={{ tabBarLabel: "Histórico" }}
            />
          </Navigator>
        </View>
      )}
    </NavigationContainer>
  );
}
