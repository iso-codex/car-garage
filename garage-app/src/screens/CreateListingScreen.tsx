import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



export default function CreateListingScreen({ navigation }: any) {
const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState<string | null>(null);


const pickImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert('Permission required');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  // ✅ Use `canceled` (not `cancelled`) and check `assets`
  if (!result.canceled && result.assets && result.assets.length > 0) {
    setImage(result.assets[0].uri);
  }
};

const uploadAndSave = async () => {
try {
let imageUrl = '';
if (image) {
const response = await fetch(image);
const blob = await response.blob();
const storageRef = ref(storage, `listings/${Date.now()}`);
await uploadBytes(storageRef, blob);
imageUrl = await getDownloadURL(storageRef);
}

await addDoc(collection(db, 'listings'), {
title,
price: parseFloat(price) || 0,
imageUrl,
createdAt: serverTimestamp(),
});


setTitle('');
setPrice('');
setImage(null);
navigation.navigate('Home');
} catch (err) {
console.log('save err', err);
alert('Could not save listing');
}
};


return (
<ScrollView contentContainerStyle={{ padding: 16 }}>
<Text style={styles.label}>Title</Text>
<TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="e.g. Wooden Table" />


<Text style={styles.label}>Price (GH₵)</Text>
<TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder="e.g. 150" keyboardType="numeric" />


<Button title="Pick image" onPress={pickImage} />
{image && <Image source={{ uri: image }} style={styles.preview} />}


<View style={{ marginTop: 16 }}>
<Button title="Save listing" onPress={uploadAndSave} />
</View>
</ScrollView>
);
}


const styles = StyleSheet.create({
input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6, marginBottom: 12 },
preview: { width: '100%', height: 200, marginTop: 12, borderRadius: 8 },
label: { fontWeight: '600', marginBottom: 6 },
});