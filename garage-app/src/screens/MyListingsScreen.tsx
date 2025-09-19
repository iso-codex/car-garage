import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { db } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ListingCard from '../components/ListingCard';


export default function MyListingsScreen({ navigation }: any) {
const [listings, setListings] = useState<any[]>([]);


useEffect(() => {
const load = async () => {
// For now we fetch all listings — replace with user-specific query once auth is added
const q = query(collection(db, 'listings'));
const snap = await getDocs(q);
setListings(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
};
load();
}, []);


return (
<SafeAreaView style={{ flex: 1 }}>
<FlatList
data={listings}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<ListingCard item={item} onPress={() => navigation.navigate('Details', { id: item.id })} />
)}
/>
</SafeAreaView>
);
}