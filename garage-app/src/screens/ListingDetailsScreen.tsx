import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';


export default function ListingDetailsScreen({ route }: any) {
const { id } = route.params || {};
const [item, setItem] = useState<any>(null);


useEffect(() => {
const load = async () => {
if (!id) return;
const d = await getDoc(doc(db, 'listings', id));
if (d.exists()) setItem({ id: d.id, ...(d.data() as any) });
};
load();
}, [id]);


if (!item) return <View style={styles.center}><Text>Loading...</Text></View>;


return (
<ScrollView contentContainerStyle={{ padding: 16 }}>
{item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
<Text style={styles.title}>{item.title}</Text>
{item.price != null && <Text style={styles.price}>GH₵ {item.price}</Text>}
<Text style={styles.desc}>{item.description}</Text>
<View style={{ marginTop: 16 }}>
<Button title="Contact seller" onPress={() => alert('Implement contact flow (call / chat)')} />
</View>
</ScrollView>
);
}


const styles = StyleSheet.create({
center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
image: { width: '100%', height: 300, borderRadius: 8 },
title: { fontSize: 22, fontWeight: '700', marginTop: 12 },
price: { fontSize: 18, marginTop: 6 },
desc: { marginTop: 10, lineHeight: 20 },
});