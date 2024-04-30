import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import Home from "../pages/Home";
import Historic from "../pages/Historic";

const BottomTab = createBottomTabNavigator();
//inutil pode apagar
function Routes(){
    // verirficar se isso esta correto 
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen  name="Adicione a Ração" component={Home} options={{tabBarLabel: "Nova Ração"}}/>
            <BottomTab.Screen name="Historico" component={Historic} options={{tabBarLabel: "Historico"}}/> 
        </BottomTab.Navigator>
    )
}


export default Routes;