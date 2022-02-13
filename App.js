import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useDebugValue } from 'react';
import { useState } from 'react';

export default function App() {

  const [valinta, setValinta] = useState('USD');
  const [rahaSumma, setRahaSumma] = useState('');
  const [vastaus, setVastaus] = useState('');
  
  const laske = () => {
    fetch(`http://api.exchangeratesapi.io/latest?access_key=9159b3aaf7405dfc09e1dd62e6af3880&symbols=${valinta}`)
    .then(res => res.json())
    .then(data => {
      setVastaus((rahaSumma * Object.values(data.rates)).toFixed(2) + ' €')
    })
    .catch(error => {
      Alert.alert('Error', error);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.vastaus}>{vastaus}</Text>
      <TextInput placeholder='€' onChangeText={ text => setRahaSumma(text) } />
      <Picker
        selectedValue={valinta}
        style={{ height: 50, width: 150}}
        onValueChange={(value, index) => setValinta(value)}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="GBP" value="GBP" />
        <Picker.Item label="JPY" value="JPY" />
        <Picker.Item label="AUD" value="AUD" />
        <Picker.Item label="CHF" value="CHF" />
      </Picker>
      <Button title="Convert" onPress={laske} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
