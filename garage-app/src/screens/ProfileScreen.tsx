import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default function ProfileScreen({ navigation }: any) {
return (
<View style={styles.container}>
<Text style={styles.name}>Seller Name</Text>
<Text style={{ marginTop: 8 }}>seller@example.com</Text>
<View style={{ marginTop: 20 }}>
<Button title="Edit profile" onPress={() => alert('Add edit profile screen')} />
</View>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
name: { fontSize: 20, fontWeight: '700' },
});