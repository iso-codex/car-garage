import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';


export type HomeStackParamList = {
Home: undefined;
Details: { id: string } | undefined;
};


const Stack = createNativeStackNavigator<HomeStackParamList>();


export default function HomeStack() {
return (
<Stack.Navigator>
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Details" component={ListingDetailsScreen} />
</Stack.Navigator>
);
}