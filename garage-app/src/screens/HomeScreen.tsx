import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import ListingCard from '../components/ListingCard';
import { db } from '../utils/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Listing } from '../types';


export default function HomeScreen({ navigation }: any) {
const [listings, setListings] = useState<Listing[]>([]);


useEffect(() => {
const load = async () => {
try {
const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
const snap = await getDocs(q);
const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
setListings(data);
} catch (err) {
console.log('err', err);
}
};
load();
}, []);


return (
<SafeAreaView style={{ flex: 1 }}>
<FlatList
data={listings}
keyExtractor={(item) => item.id || Math.random().toString()}
renderItem={({ item }) => (
<ListingCard
item={item}
onPress={() => navigation.navigate('Details', { id: item.id })}
/>
)}
ListEmptyComponent={() => (
<View style={styles.empty}><Text>No listings yet — add one!</Text></View>
)}
/>
</SafeAreaView>
);
}


const styles = StyleSheet.create({
empty: { alignItems: 'center', marginTop: 40 },
});