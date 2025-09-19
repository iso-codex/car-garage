import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import CreateListingScreen from '../screens/CreateListingScreen';
import MyListingsScreen from '../screens/MyListingsScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();


export default function BottomTabs() {
return (
<Tab.Navigator screenOptions={({ route }) => ({
headerShown: false,
tabBarIcon: ({ color, size }) => {
let name: any = 'home';
if (route.name === 'Home') name = 'home';
else if (route.name === 'Create') name = 'add-circle';
else if (route.name === 'MyListings') name = 'list';
else if (route.name === 'Profile') name = 'person';
return <Ionicons name={name} size={size} color={color} />;
},
})}>
<Tab.Screen name="Home" component={HomeStack} />
<Tab.Screen name="Create" component={CreateListingScreen} />
<Tab.Screen name="MyListings" component={MyListingsScreen} />
<Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
);
}