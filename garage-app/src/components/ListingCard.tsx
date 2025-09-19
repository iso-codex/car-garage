import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Listing } from '../types';


type Props = {
item: Listing;
onPress?: () => void;
};


export default function ListingCard({ item, onPress }: Props) {
return (
<TouchableOpacity style={styles.card} onPress={onPress}>
{item.imageUrl ? (
<Image source={{ uri: item.imageUrl }} style={styles.image} />
) : (
<View style={[styles.image, styles.placeholder]} />
)}
<View style={styles.info}>
<Text style={styles.title}>{item.title}</Text>
{item.price != null && <Text style={styles.price}>GH₵ {item.price}</Text>}
</View>
</TouchableOpacity>
);
}


const styles = StyleSheet.create({
card: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
image: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#ddd' },
placeholder: { justifyContent: 'center', alignItems: 'center' },
info: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
title: { fontSize: 16, fontWeight: '600' },
price: { marginTop: 6, color: '#333' },
});